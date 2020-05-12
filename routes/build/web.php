<?php
Route::group(['prefix'=>'build','namespace'=>'Build'], function (){
    Route::get('/', 'BuildController@root')->name('build.home');
    Route::get('/upload', 'BuildController@upload')->name('build.upload');
    Route::post('/upload', 'BuildController@uploadHandle');
    Route::get('/form', 'BuildController@form')->name('build.form');
    Route::post('/form', 'BuildController@formHandle');
    Route::get('/view', 'BuildController@view');
});
