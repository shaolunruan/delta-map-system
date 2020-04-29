<?php
Route::group(['prefix'=>'build','namespace'=>'Build'], function (){
    Route::get('/', 'BuildController@root');
    Route::get('/upload', 'BuildController@upload');
    Route::get('/form', 'BuildController@form');
});
