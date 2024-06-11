<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProportyController;
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
    
    Route::get('/myproperties', [ProportyController::class, 'myproperties'])->name('myproperties');
    Route::get('/myproperties', [ProportyController::class, 'myproperties'])->name('myproperties');
    Route::get('/myproperties', [ProportyController::class, 'myproperties'])->name('myproperties');
    Route::get('/myproperties', [ProportyController::class, 'myproperties'])->name('myproperties');







    Route::inertia('/usersettings', 'user/UserSettings');
    Route::post('/usersettings', [UserController::class, 'leave'])->name('leave');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});


