<?php

namespace App\Http\Controllers\Build;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BuildController extends Controller
{
    public function root()
    {
        return view('build.upload.build');
    }
    public function upload()
    {
        echo 'im upload';
    }

    public function form()
    {
        return view('build.form.form');
    }
}
