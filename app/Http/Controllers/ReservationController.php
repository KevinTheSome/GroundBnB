<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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

    public function accept(Request $request)
    {
        $request->validate([
            'reservation_id' => 'required|integer',
        ]);
        $reservation = Reservation::find($request->input('reservation_id'));
        $reservation->taken = true;
        $reservation->save();
    }
    public function myproperties()
    {
        $reservationes = DB::table('reservations')
            ->join('properties', 'properties.owner_id', '=', 'reservations.property_id')
            ->select('reservations.*' ,'reservations.price as reservation_price', 'properties.*')
            ->get();

        $reservationes = $reservationes->where('owner_id', auth()->user()->id);
        return Inertia::render('user/MyProperties' , ['reservationes' => $reservationes]);
    }
}
