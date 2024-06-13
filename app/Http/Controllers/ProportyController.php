<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\uploadedFile;
use App\Models\Reviews;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProportyController extends Controller
{
    public function index()
    {
        return Inertia::render('Index' , ['properties' => Property::all()]);
    }

    public function new()
    {
        return Inertia::render('properties/PropertiesNew');
    }

    public function create(Request $request)
    {
        $request->validate([
            'file_upload' => 'required|mimes:jpg,png,jpeg|max:4000',
            'address' => 'required',
            'price' => 'required|integer|min:0',
            'description' => 'required|string',
            'beds' => 'required|integer|min:0',
        ]);

        $proporty = new Property();
        $proporty->address = $request->input('address');
        $proporty->price = $request->input('price');
        $proporty->description = $request->input('description');
        $proporty->beds = $request->input('beds');
        $proporty->owner_id = auth()->user()->id;

        // Store the file in storage\app\public folder
        $file = $request->file('file_upload');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->store('uploads', 'public');

        // Store file information in the database
        $uploadedFile = new uploadedFile();
        $uploadedFile->filename = $fileName;
        $uploadedFile->original_name = $file->getClientOriginalName();
        $uploadedFile->file_path = $filePath;
        $uploadedFile->save();

        $proporty->image = $uploadedFile->file_path;
        $proporty->save();

        return redirect()->intended('/');  
    }

    public function show($id)
    {
        $reviews  = DB::table('reviews')
            ->join('users', 'users.id', '=', 'reviews.user_id')
            ->select('users.name' ,'reviews.*')
            ->get();
        
        $reviews = $reviews->where('property_id' , $id);
        return Inertia::render('properties/Properties' , ['property' => Property::findorfail($id) , 'reviews' => $reviews]);
    }

    public function edit($id)
    {
        return Inertia::render('properties/PropertiesEdit' , ['property' => Property::findorfail($id)]);
    }

    public function update(Request $request , $id)
    {
        $request->validate([
            'file_upload' => 'required|mimes:jpg,png,jpeg|max:4000',
            'address' => 'required',
            'price' => 'required|integer|min:0',
            'description' => 'required|string',
            'beds' => 'required|integer|min:0',
        ]);

        $proporty = Property::findorfail($id);
        $proporty->address = $request->input('address');
        $proporty->price = $request->input('price');
        $proporty->description = $request->input('description');
        $proporty->beds = $request->input('beds');
        $proporty->owner_id = auth()->user()->id;

        // Store the file in storage\app\public folder
        $file = $request->file('file_upload');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->store('uploads', 'public');

        // Store file information in the database
        $uploadedFile = new uploadedFile();
        $uploadedFile->filename = $fileName;
        $uploadedFile->original_name = $file->getClientOriginalName();
        $uploadedFile->file_path = $filePath;
        $uploadedFile->save();

        $proporty->image = $uploadedFile->file_path;
        $proporty->save();

        return redirect()->intended('/'); 
    }

    public function delete($id)
    {
        $proporty = Property::findorfail($id);
        if (auth()->user()->id == $proporty->owner_id) {
            $proporty->delete();    
        }
        
        return redirect()->intended('/');
    }

    public function myproperties()
    {
        return Inertia::render('Index' , ['properties' => Property::where('owner_id', auth()->user()->id)->get()]);
    }
}
