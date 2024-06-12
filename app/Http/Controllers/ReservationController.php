<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function reserve(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer',
            'startDate' => 'required',
            'endDate' => 'required',
            'price' => 'required|integer|min:0',
            'days' => 'required|integer|min:0',
        ]);

        $reservation = new Reservation();
        $reservation->property_id = $request->input('property_id');
        $reservation->user_id = auth()->user()->id;
        $reservation->start_date = $request->input('startDate');
        $reservation->end_date = $request->input('endDate');
        $reservation->price = $request->input('price') * $request->input('days');
        $reservation->days = $request->input('days');
        $reservation->taken = false;
        $reservation->save();
    }
}
