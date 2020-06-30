<?php
Route::group(['prefix'=>'api','namespace'=>'Api'], function (){
//    Route::get('/', 'GalleryController@index')->name('gallery.index');
//    Route::get('/{id}', 'GalleryController@dmsystem')->name('gallery.dmsystem');
    Route::get('/ini', 'ApiController@ini');
    Route::get('/nba_mip_pts', 'ApiController@nba_mip_pts');
    Route::get('/nba_mip_reb', 'ApiController@nba_mip_reb');
    Route::get('/nba_mip_ast', 'ApiController@nba_mip_ast');
    Route::get('/nba_mip_FG', 'ApiController@nba_mip_FG');
    Route::get('/nba_mip_min', 'ApiController@nba_mip_min');
});
