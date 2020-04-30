@extends('build.upload.master')
@section('content')
    <link rel="stylesheet" href="/css/_build.css">
    <div class="children">
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Step1</a></li>
                <li role="presentation"><a href="#">Step2</a></li>
                <li role="presentation"><a href="#">Step3</a></li>
            </ul>
        <div class="upload">
            <form action="">
                <input type="file" id="exampleInputFile">
                <p class="help-block">Please upload your data file to be visualized.</p>
                <p class="help-block">Support .json .csv, etc.</p>
                {{csrf_field()}}
                <button type="submit" class="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    </div>

@endsection

