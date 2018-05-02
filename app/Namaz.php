<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Namaz extends Model
{
    protected $fillable = [
        'masjid_id',
        'fajr',
        'zohar',
        'asar',
        'maghrib',
        'isha',
        'juma'
    ];
}
