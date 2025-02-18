<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class SendContactInfoController extends Controller
{
    public function sendReactEmail(Request $request)
    {
        $htmlContent = $request->input('html'); // Recibe el HTML renderizado

        Mail::send([], [], function ($message) use ($htmlContent) {
            $message->to('fabriloco2002@gmail.com')
                ->subject('Correo de Contacto')
                ->html($htmlContent);
        });

        return response()->json(['message' => 'Correo enviado con éxito']);
    }
}
