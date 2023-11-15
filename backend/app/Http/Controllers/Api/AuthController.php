<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated(); 
        $user = User::create([      
             'name' => $data['name'],
             'email' => $data['email'],
             'role' => 'user',
             'password' => bcrypt($data['password']),
         ]);

        $token = $user->createToken('auth_token')->plainTextToken; 
        return response (compact('user', 'token'));
    }

    public function singin(Request $request)
    {
        $this->validate($request, [
            'signin'    => 'required',
            'password' => 'required',
        ]);
        $signin_type = filter_var($request->input('signin'), FILTER_VALIDATE_EMAIL ) 
        ? 'email' 
        : 'phone';

        $request->merge([
            $signin_type => $request->input('signin')
        ]);

        if (!Auth::attempt($request->only($signin_type, 'password'))) {
            return response([
                        'message' => 'Provided email or phone or password is incorrect'
                     ],422);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response (compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);   
    }

    public function updateProfile(Request $request)
    {
        
        $this->validate($request, [
            'name'    => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore(auth()->user()->id),
            ],
            'phone' => [
                'required',
                Rule::unique('users', 'phone')->ignore(auth()->user()->id),
            ],
            'role' => 'required',
        ]);

        if($request->current_password || $request->new_password){
            $this->validate($request, [
                'current_password' => 'required',
                'new_password' => [
                    'required',
                    'confirmed',
                    Password::min(8)
                        ->mixedCase()
                        ->letters()
                        ->numbers()
                        ->symbols()
                ]
            ]);

            if(!Hash::check($request->current_password, auth()->user()->password)){
                return response([
                    'message' => 'Current password is incorrect'
                 ],422);
            }

            User::whereId(auth()->user()->id)->update([
                'password' => Hash::make($request->new_password)
            ]);
        }

        $user = auth()->user();
        $user->update($request->all());
        return response([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);

        
    }
}
