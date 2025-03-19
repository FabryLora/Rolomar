<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function signup(Request $request)
    {
        $data = $request->validate([
            'nomcuit' => "required|string|max:255",
            'email' => "required|string|email|max:255|unique:users,email",
            "password" => "required|confirmed|string|min:8",
            "cuit" => "required|string|max:100",
            "direccion" => "required|string|max:100",
            "provincia" => "nullable|string|max:100",
            "localidad" => "nullable|string|max:100",
            "lista" => "nullable|string|max:100",
            "autorizado" => "nullable|boolean",
            "descuento" => "nullable|integer"

        ]);

        /** @var \App\Models\User $user */
        $user = User::create([
            'nomcuit' => $data['nomcuit'],
            'email' => $data['email'],
            'cuit' => $data['cuit'],
            'direccion' => $data['direccion'],
            'provincia' => $data['provincia'],
            'localidad' => $data['localidad'],
            'lista' => $data['lista'],
            'autorizado' => $data['autorizado'] ?? false,
            'descuento' => $data['descuento'] ?? 0,
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'nomcuit' => "required|string|max:255",
            "password" => "required",
            'remember' => 'boolean',
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }
        /**  @var \App\Models\User $user */
        $user = Auth::user();


        if (!$user->autorizado) {
            Auth::logout();
            return response([
                'error' => 'Your account is not authorized. Please contact support.'
            ], 403);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /**
         * @var User $user
         */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'id' => $request->user()->id,
            $request->user(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        $data = $request->validate([
            'nomcuit' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $id,
            'cuit' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:255',
            'provincia' => 'nullable|string|max:255',
            'localidad' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
            'lista' => 'nullable|string|max:255',
            'autorizado' => 'nullable|boolean',
            'descuento' => 'nullable|integer'
        ]);

        // Solo actualiza la contraseña si se proporciona
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']); // Elimina el campo para no sobrescribirlo
        }

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => new UserResource($user)
        ], 200);
    }



    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}
