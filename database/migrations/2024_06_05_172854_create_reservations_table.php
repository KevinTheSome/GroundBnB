<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp("start_date");
            $table->timestamp("end_date");
            $table->integer("property_id")->references('id')->on('properties')->onDelete('cascade');
            $table->integer("user_id")->references('id')->on('users')->onDelete('cascade');
            $table->integer("price");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
