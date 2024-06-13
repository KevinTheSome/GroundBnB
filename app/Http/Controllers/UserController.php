<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Property;
use App\Models\Reviews;

class UserController extends Controller
{
    public function name(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255|string',
        ]);

        $user = User::find(auth()->user()->id);
        $user->name = $request->input('name');
        $user->save();
    }

    public function email(Request $request)
    {
        $request->validate([
            'email' => 'required|max:255|email|string',
        ]);
        $user = User::find(auth()->user()->id);
        $user->email = $request->input('email');
        $user->save();
    }

    public function password(Request $request)
    {
        $request->validate([
            'password' => 'required|max:255|min:8|string',
            'newPassword' => 'required|max:255|min:8|string',
        ]);

        $user = User::find(auth()->user()->id);
        if (Auth::attempt(['email' => $user->email, 'password' => $request->input('password')])) {
            $request->session()->regenerate();
 
            $user->password = Hash::make($request->input('newPassword'));
            $user->save();

            session()->invalidate();
            auth()->logout();
            return redirect()->intended('/login');
        }

    }

    public function delete(Request $request)
    {
        $request->validate([
            'password' => 'required|max:255|min:8|string',
        ]);

        $user = User::find(auth()->user()->id);
        if (Auth::attempt(['email' => $user->email, 'password' => $request->input('password')])) {

            Reviews::where('user_id', auth()->user()->id)->delete();
            Property::where('owner_id', auth()->user()->id)->delete();
            User::destroy(auth()->user()->id);
            
            session()->invalidate();
            auth()->logout();
            return redirect()->intended('/login');
        }
    }
}
