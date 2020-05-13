<?php
Route::group(['prefix'=>'gallery','namespace'=>'Gallery'], function (){
    Route::get('/', 'GalleryController@index')->name('gallery.index');
    Route::get('/{id}', 'GalleryController@dmsystem')->name('gallery.dmsystem');
});
