<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAdminRequest;
use Illuminate\Http\Request;

use App\Http\Requests\SignupAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function index(Request $request)
    {
        return AdminResource::collection(Admin::all());
    }

    public function signup(Request $request)
    {
        $data = $request->validate([
            'name' => "required|string|max:255",
            "password" => "required|confirmed|string|min:8",
        ]);

        /**  @var \App\Models\Admin $admin */
        $admin = Admin::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password'])
        ]);
        $adminToken = $admin->createToken('main')->plainTextToken;

        return response([
            'user' => $admin,
            'adminToken' => $adminToken
        ]);
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'name' => "required|string|max:255",
            "password" => "required",
            'remember' => 'boolean',
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::guard('admin')->attempt(['name' => $credentials['name'], 'password' => $credentials['password']], $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        /**  @var \App\Models\Admin $admin */
        $admin = Auth::guard('admin')->user();
        $adminToken = $admin->createToken('main')->plainTextToken;

        return response([
            'user' => $admin,
            'adminToken' => $adminToken
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json(Admin::find($id));
    }




    public function me(Request $request)
    {
        return response()->json(Admin::all());
    }

    public function update(Request $request, $id)
    {
        // Buscar el administrador por ID
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        // Validar los datos de la solicitud
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed', // Si se proporciona, se valida como mínimo 8 caracteres
        ]);

        // Actualizar los campos que han sido validados
        if (isset($validated['name'])) {
            $admin->name = $validated['name'];
        }

        if (isset($validated['password'])) {
            $admin->password = bcrypt($validated['password']);
        }

        // Guardar los cambios
        $admin->save();

        // Retornar la respuesta con el administrador actualizado
        return response()->json([
            'message' => 'Admin updated successfully',
            'user' => $admin
        ]);
    }
}
