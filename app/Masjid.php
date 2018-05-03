<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Masjid extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'phone',
        'address',
        'coordinates',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function namaz() {
        return $this->hasOne(Namaz::class);
    }
}
