<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProportyController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewsController;
use Inertia\Inertia;

Route::group(['middleware' => ['auth', 'verified']], function () {
    
});

Route::get('/', [ProportyController::class, 'index']);

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::group(['middleware' => 'guest'], function () {
    Route::inertia('/register', 'auth/Register');
    Route::post('/register', [AuthController::class, 'registerPost'])->name('register');
    Route::inertia('/login', 'auth/Login');
    Route::post('/login', [AuthController::class, 'loginPost'])->name('login');
});

Route::group(['middleware' => 'auth'], function () {
    
    Route::get('/properties/new', [ProportyController::class, 'new'])->name('new');
    Route::post('/properties', [ProportyController::class, 'create'])->name('create');

    Route::get('/properties/{id}', [ProportyController::class, 'show'])->name('show');
    Route::get('/properties/{id}/edit', [ProportyController::class, 'edit'])->name('edit');
    Route::post('/properties/{id}/update', [ProportyController::class, 'update'])->name('update');
    Route::delete('/properties/{id}/delete', [ProportyController::class, 'delete'])->name('delete');

    Route::get('/myproperties', [ProportyController::class, 'myproperties'])->name('myproperties');
    
    Route::get('/gallery/{id}', [ProportyController::class, 'myproperties'])->name('myproperties');
    Route::get('/gallery/{id}/add', [ProportyController::class, 'myproperties'])->name('myproperties');
    Route::get('/gallery/{id}/remove', [ProportyController::class, 'myproperties'])->name('myproperties');
    
    Route::post('/reservation', [ReservationController::class, 'reserve'])->name('reserve');
    Route::get('/reservation/myproperties', [ReservationController::class, 'myproperties'])->name('myproperties');
    Route::post('/reservation/myproperties/accept', [ReservationController::class, 'accept'])->name('accept');

    Route::post('/rewiew/add', [ReviewsController::class, 'add'])->name('add');
    // Route::get('/reservation', [ProportyController::class, 'myproperties'])->name('myproperties');
    // Route::get('/reservation', [ProportyController::class, 'myproperties'])->name('myproperties');




    Route::post('/user/settings/name', [UserController::class, 'name'])->name('name');
    Route::post('/user/settings/email', [UserController::class, 'email'])->name('email');
    Route::post('/user/settings/password', [UserController::class, 'password'])->name('password');
    Route::post('/user/settings/delete', [UserController::class, 'delete'])->name('delete');
    
    Route::inertia('/user/settings', 'user/UserSettings');
    Route::post('/user/settings', [UserController::class, 'leave'])->name('leave');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});


