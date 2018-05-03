<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNamazsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('namazs', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('masjid_id');
            $table->foreign('masjid_id')
                ->references('id')->on('masjids')
                ->onDelete('cascade')
                ->unique();

            $table->time('fajr')->nullable();
            $table->time('zohar')->nullable();
            $table->time('asar')->nullable();
            $table->time('maghrib')->nullable();
            $table->time('isha')->nullable();
            $table->time('juma')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('namazs');
    }
}
