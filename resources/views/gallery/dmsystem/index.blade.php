@extends('gallery.dmsystem.master')
@section('content')
    {{--    import bootstrap4--}}
    <link rel="stylesheet" href="/css/bootstrap4.min.css">
    <script src="/js/library/jquery.slim.min.js"></script>
    <script src="/js/library/popper.min.js"></script>
    <script src="/js/library/bootstrap.min.js"></script>
    <style>
        .dmsystem {
            height: 85vh;
            width: 95vw;
            border: solid 1px #d8d8d8;
            border-radius: .5em;
        }
        .container-left {
            padding: 15px;
            width: 21.5vw;
            border-right: solid 1px #d8d8d8;
        }
        .container-right {
            padding: 8px;
        }
        .container-left div{
            margin: 2px
        }
        .dm{
            position: relative;
            min-height: 60vh;
        }
        .chart{
            border-top: solid 1px #d8d8d8;
            /*display: none;*/
            padding-top: 5px;
        }
        .dmsystem .container-left>div:nth-child(1) {
            /*flex-grow: 1;*/
            width: inherit;
            height:200px
            /*background: #0f6674;*/

        }
        .dmsystem .container-left .name-display{
            border: solid 1px #f8f9fa;
            border-radius: .5em;
            background: #f8f9fa;
            font-size: 1.2em;
            padding: 5px;
        }
        .dmsystem .container-left table{
            border: solid 1px #d8d8d8;
            border-radius: .5em;
            height: 140px;
            font-size: .7em;
            font-weight: lighter;
            margin-bottom: 0;
        }
        .dmsystem .container-left .myLabel {
            font-family: 'Nunito', sans-serif;
            font-weight: normal;
            font-size: .9em;
        }
        .dmsystem .container-left .myText{
            font-family: 'Nunito', sans-serif;
            font-weight: normal;
            font-size: .8em;
        }
        .dmsystem .container-left button {
            background-color: #766cf5;
            /*border-color: #8278f7;*/
            color: #fff;
            border-radius: .5em;
            height: 38px;
            width: 100%;
            margin-top: 20px;
        }
        hr{
            width: 100%;
            /*margin: 0 auto;*/
            margin: 5px 0 5px 0;
        }
        .dmsystem .container-left .custom-control-inline{
            margin-right: 9px;
        }
        .dmsystem .container-right .right-dm {
            height: 100%;
            width: 250px;
            position: absolute;
            right: 0;
            top: 0;
        }
        .dmsystem .container-right .right-dm>.detail {
            width: 100%;
            min-height: 0;
            background-color: #f8f8f8;
        }
        .dmsystem .container-right .right-dm>.snCounter {
            width: 100%;
            background-color: #f8f8f8;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats{
            width: 100%;
            height: 25.5%;
            position: relative;
            background-color: #f8f8f8;
            border-bottom: solid 3px #fff;
            cursor: pointer;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats>.sensitivity-stats-text {
            position: absolute;
            top: -5px;
            color: #797979;
            padding-left: 10px;
            font-family: 'Nunito', sans-serif;
            font-size: 1em;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats>.counter{
            color: #4e4e4e;
            /*padding:0 20px 0 10px;*/
            /*font-family: 'Nunito', sans-serif;*/
            /*font-size: 10em;*/
            position: absolute;
            right: 80px;
            top: -5px;

        }
        #dm-svg{
            width: 672px;
        }
        .dm>.switch {
            position: absolute;
            top:0;
            right: 260px;
        }
        .dm>#loading {
            display: block;
            font-size: 17em;
            color: #f0f0f0;
            position: absolute;
            left: 250px;
            top: 50px;
        }
        .dm>svg>#showHL .HL>path:hover{
            stroke-width: 8px;
        }
        .dm>.detail{
            position: absolute;
            background-color: rgba(1,0,0,0.5);
            transition-duration: 3s;
            transition-property: all;
            transition-timing-function: ease;
            transition-delay: 0s;
            top:0;
            left: 0;
            width: 180px;
        }
        #zoom-in {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            display: none;
            text-align: center;
            background-color: rgba(36, 36, 36, 0.9);
        }
        .snCounter{
            position: relative;
        }
        .snCounter>button{
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            z-index:10
        }
        .close {
            font-size: 3em;
            color: #868686;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            position: absolute;
            right: 40px;
            top: 20px;
            cursor: pointer;
        }
        #zoom-in-chart {
            width: 900px;
            height: 700px;
            margin: 0 auto ;
            opacity: 100%;
        }
        .dm>#zoom-dm {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 50px;
            font-size: 1.5em;
            text-align: center;
            color: #747474;
            cursor: pointer;
        }
        #zoom-in>.bg-button {
            position: absolute;
            right: 40px;
            bottom: 20px;
            float: right;
        }
        #manual{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            /*display: none;*/
            text-align: center;
            background-color: rgba(36, 36, 36, 0.9);
        }
        /*.modal-content{*/
        /*    text-indent: 1em;*/
        /*}*/
    </style>
    <div>
        {{--
        自动弹出的模态框
        --}}
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Welcome to Delta Map System!</h5>
                    </div>
                    <div class="modal-body">
                        &bull;Delta Map module is the central chart.</br>
                        &bull;Use left panel to customize your needs.</br>
                        &bull;Click stats module to zoom in and interact.</br>
                        &bull;Click `update DeltaMap` to refresh the system.</br>
                        &bull;Note that Exploration Mode is available only if the data field is multiple.</br>
                        &bull;Contact haywardryan@foxmail.com if you have any flourished idea and suggestions.</br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick="close_manual()" class="btn btn-primary">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <div id="zoom-in">
            <div id="zoom-in-chart">
                <svg id="zoom-in-svg"></svg>
            </div>
            <span class="close" onclick="x()">x</span>
            <div class="bg-button btn-group-vertical">
                <button type="button" class="btn btn-secondary" onclick="bg_grey()">Primary</button>
                <button type="button" class="btn btn-light" onclick="bg_white()">White</button>
                <button type="button" class="btn btn-dark" onclick="bg_dark()">Dark</button>
            </div>
        </div>
        {{--所有的视图组件--}}
        <div id="system" data-text={{$id}}></div>
    </div>
    <script>
        function x(){
            document.getElementById('zoom-in').style.display = 'none';
        }

        function bg_grey(){
            document.getElementById('zoom-in').style.backgroundColor = 'rgba(36, 36, 36, 0.9)'
        }

        function bg_white(){
            document.getElementById('zoom-in').style.backgroundColor = 'white'
        }

        function bg_dark(){
            document.getElementById('zoom-in').style.backgroundColor = 'rgb(0,0,0)'
        }

        function close_manual(){
            $('#myModal').modal('hide');
        }

        $(window).on('load',function(){
            $('#myModal').modal('show');
        });
    </script>

    <script type="text/javascript" src="../js/app.js"></script>

@endsection

