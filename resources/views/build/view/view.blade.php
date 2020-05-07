@extends('build.view.master')
@section('content')
    <link rel="stylesheet" href="/css/build.css">
    <link rel="stylesheet" href="\less\buildSupp.css">
    <script type="text/javascript" src="{{URL::asset('js/library/d3.v4.min.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('js/library/dat.gui.min.js')}}"></script>
    <?php
    $need = Session::get('need');
    ?>

    <div class="children" id="myChildren">
        <ul class="nav nav-tabs">
            <li role="presentation"><a href="#">Step1</a></li>
            <li role="presentation"><a href="/build/form">Step2</a></li>
            <li role="presentation" class="active"><a href="">View-{{$need['data_name']}}</a></li>
        </ul>
        <div class="counter-panel">
            <div id="title">Counter:</div>
            <div id="counter"></div>
        </div>
        {{--        view set here--}}
        <svg width="960" height="600" class="dm"></svg>
    </div>
{{--    add js/css here, scope svg above--}}
    <script type='text/javascript' src="{{URL::asset('js/build/view/deltamapContinuous.js')}}"></script>
    <link rel="stylesheet" href="/css/dmc.css">
@endsection

