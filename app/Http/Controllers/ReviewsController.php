<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reviews;

class ReviewsController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer',
            'stars' => 'required|integer|min:0|max:5',
            'comment' => 'required|string|max:510',
        ]);

        $review = new Reviews();
        $review->property_id = $request->input('property_id');
        $review->user_id = auth()->user()->id;
        $review->stars = $request->input('stars');
        $review->comment = $request->input('comment');
        $review->save();
    }
}
