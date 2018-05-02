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
                ->onDelete('cascade');

            $table->time('fajr');
            $table->time('zohar');
            $table->time('asar');
            $table->time('maghrib');
            $table->time('isha');
            $table->time('juma');

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
