<?php

namespace App\Http\Controllers;

use App\Masjid;
use App\Namaz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MasjidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO - USER ACL
        return Masjid::all();
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
            'masjid' => 'required',
            'masjid.name' => 'required',
        ]);

        try {
            $data = $request->masjid;
//            $data['user_id'] = Auth::id();

            $data = (array) $data;

            $user = Auth::user();

            $res = $user->masjids()->create($data);

            return response()->json($res);

//            return Masjid::create($data);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Masjid  $masjid
     * @return \Illuminate\Http\Response
     */
    public function show(Masjid $masjid)
    {
        try {
            if($masjid) {
                return response()->json($masjid, 200);
            }
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Masjid  $masjid
     * @return \Illuminate\Http\Response
     */
    public function edit(Masjid $masjid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Masjid  $masjid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Masjid $masjid)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Masjid  $masjid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Masjid $masjid)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response('Please Login first', 401);
            }
            $masjid = $user->masjids()->find($masjid->id);

            if (!$masjid) {
                return response()->json('You are not authorized to delete', 403);
            }
            return response()->json($masjid->delete());
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 404);
        }

    }
}
