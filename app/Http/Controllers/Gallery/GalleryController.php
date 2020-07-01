<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return view('gallery.index.index');
    }

    public function dmsystem($id)
    {
        return view('gallery.dmsystem.index')->with('id',$id);
    }

    /*
     * 根据分类来filter数据集卡片
     * */
    public function category($cate){
        return view('gallery.index.category')->with('cate',$cate);
    }

}
