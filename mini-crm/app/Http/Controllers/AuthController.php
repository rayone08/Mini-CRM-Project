<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User; 

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        \Log::info('Login attempt:', $credentials);

        $user = User::where('email', $credentials['email'])->first();

        if ($user && $user->password === $credentials['password']) {
            $token = JWTAuth::fromUser($user);
            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout(); 
        return response()->json(['message' => 'Successfully logged out']);
    }
}
