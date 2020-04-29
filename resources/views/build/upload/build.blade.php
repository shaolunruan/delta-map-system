@extends('build.upload.master')
@section('content')
    <link rel="stylesheet" href="/css/build.css">
    <div class="children">
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Step1</a></li>
                <li role="presentation"><a href="#">Step2</a></li>
                <li role="presentation"><a href="#">Step3</a></li>
            </ul>
        <div class="upload">
            <input type="file" id="exampleInputFile">
            <p class="help-block">Please upload your data file to be visualized.</p>
            <p class="help-block">Support .json .csv, etc.</p>
        </div>
    </div>

@endsection

