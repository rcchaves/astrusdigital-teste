<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\CadastroRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{     
    public function register(CadastroRequest $request){
        

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

     
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];

        
    }

    public function login(LoginRequest $request){
        $data = $request->validated();

        
        if(!Auth::attempt($data)) {
            return response([
                'errors' => ['O email ou a senha estão incorretos!!!']
            ], 422);
        }

      
        $user = Auth::user();
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];

    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return [
            'user' => null
        ];

    }
}
