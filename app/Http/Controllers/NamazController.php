<?php

namespace App\Http\Controllers;

use App\Masjid;
use App\Namaz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NamazController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'namaz' => 'required',
            'namaz.masjid_id' => 'required',
        ]);

        try {
            $data = $request->namaz;

            $user = Auth::user();

            if (!$user) {
                return response('Please Login first', 401);
            }

            $masjid = $user->masjids()->find($data['masjid_id']);


            // find user masjid first
            if ($masjid) {
                $namaz = $masjid->namaz;

                if ($namaz) {
                    return $namaz->update($data);
                } else {
                    return $masjid->namaz()->create($data);
                }
            } else {
                return response()->json('You are not authorized', 403);
            }

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Namaz  $namaz
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $masjid_id)
    {
        try {
            $masjid = Masjid::find($masjid_id);
            if($masjid && $masjid->namaz) {
                return response()->json($masjid->namaz, 200);
            } else {
                return response()->json('timings not found', 404);
            }
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Namaz  $namaz
     * @return \Illuminate\Http\Response
     */
    public function edit(Namaz $namaz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Namaz  $namaz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Namaz $namaz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Namaz  $namaz
     * @return \Illuminate\Http\Response
     */
    public function destroy(Namaz $namaz)
    {
        //
    }
}
