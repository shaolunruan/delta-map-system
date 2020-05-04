<?php

namespace App\Http\Controllers\Build;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BuildController extends Controller
{
//    public function root()
//    {
//        return view('build.upload.build');
//    }
    public function upload(Request $request)
    {
        return view('build.upload.build');
    }

    public function uploadHandle(Request $request)
    {
        $validFileExtension = ['json', 'csv', 'gif'];
        $path = md5(time() . rand(100000, 999999)).'.'.$request->file('dataFile')->getClientOriginalExtension();
        if ($request->hasFile('dataFile') && $request->file('dataFile')->isValid()){
            if(in_array($request->file('dataFile')->getClientOriginalExtension(), $validFileExtension)){
                $file = $request->file('dataFile');
                $request->file('dataFile')->move('./uploads', $path);
            }else{
                $errorInfo = $request->file('dataFile')->getClientOriginalExtension();
                return back()->withErrors(['Datafile format "'.$errorInfo.'" is not supported. Please change into regular datafile format(.json or .csv)']);
            }
        }else{
            return back()->withErrors(['DaData file upload failed:(']);
        }
//        dd($request->all());
    }

    public function form()
    {
        return view('build.form.form');
    }
}
