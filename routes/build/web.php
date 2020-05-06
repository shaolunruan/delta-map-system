<?php
Route::group(['prefix'=>'build','namespace'=>'Build'], function (){
    Route::get('/', 'BuildController@root');
    Route::get('/upload', 'BuildController@upload');
    Route::post('/upload', 'BuildController@uploadHandle');
    Route::get('/form', 'BuildController@form');
    Route::post('/form', 'BuildController@formHandle');

    Route::get('/test', "BuildController@t");
});
