<?php
Route::group(['prefix'=>'api','namespace'=>'Api'], function (){
//    Route::get('/', 'GalleryController@index')->name('gallery.index');
//    Route::get('/{id}', 'GalleryController@dmsystem')->name('gallery.dmsystem');
    Route::get('/ini', 'ApiController@ini');
});
