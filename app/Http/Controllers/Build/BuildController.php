<?php

namespace App\Http\Controllers\Build;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BuildController extends Controller
{
    public function upload(Request $request)
    {
        return view('build.upload.build');
    }

    public function uploadHandle(Request $request)
    {
        $validFileExtension = ['json', 'csv', 'gif'];
        //check file validation
        if ($request->hasFile('dataFile') && $request->file('dataFile')->isValid()){
            //check file type
            if(in_array($request->file('dataFile')->getClientOriginalExtension(), $validFileExtension)){
                //check file size
                if($request->file('dataFile')->getSize() > 5*1024*1024){
                    return back()->withErrors(['File size is too large (exceed 5M)',
                    ]);
                }else{
                    //the handle of data if everything goes right
                    $path = md5(time() . rand(100000, 999999)).'.'.$request->file('dataFile')->getClientOriginalExtension();
                    $request->file('dataFile')->move('./uploads', $path);
//                    dd($path);
                    return redirect('/build/form')->with('message',"Yh! Datafile uploaded successfully!  Next customize your need below.");
                }
            }else{
                $errorFormat = $request->file('dataFile')->getClientOriginalExtension();
                return back()->withErrors(['Datafile format "'.$errorFormat.'" is not supported. Please change into regular datafile format(.json or .csv)']);
            }
        }else{
            return back()->withErrors(['Data file upload failed:(']);
        }
    }

    public function form()
    {
        return view('build.form.form');
    }

    public function formHandle()
    {

    }
}
