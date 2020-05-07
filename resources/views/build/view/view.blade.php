@extends('build.view.master')
@section('content')

{{--    <link rel="stylesheet" href="/css/build.css">--}}
{{--    <link rel="stylesheet" href="\less\buildSupp.css">--}}
{{--    <script type='text/javascript' src="/js/build/view/deltamapContinuous.js"></script>--}}
{{--    <script type='text/javascript' src="{{URL::asset('js/build/view/deltamapContinuous.js')}}"></script>--}}

{{--    <div class="children">--}}
{{--        <ul class="nav nav-tabs">--}}
{{--            <li role="presentation"><a href="#">Step1</a></li>--}}
{{--            <li role="presentation"><a href="/build/form">Step2</a></li>--}}
{{--            <li role="presentation" class="active"><a href="">View12138</a></li>--}}
{{--        </ul>--}}

{{--        <svg width="960" height="550"></svg>--}}
{{--    </div>--}}
<?php
$need = Session::get('need');
?>
<div>{{$info['data_name']}}</div>
@endsection

