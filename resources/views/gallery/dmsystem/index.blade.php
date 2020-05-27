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
        }
        .dmsystem .container-right .right-dm>.counter {
            width: 100%;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats{
            width: 100%;
            height: 30%;
            position: relative;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats>.sensitivity-stats-text {
            color: #fff;
            padding-left: 10px;
            font-family: 'Nunito', sans-serif;
            font-size: 1em;
        }
        .dmsystem .container-right .right-dm>.sensitivity-stats>.counter{
            color: #fff;
            /*padding:0 20px 0 10px;*/
            /*font-family: 'Nunito', sans-serif;*/
            /*font-size: 10em;*/
            position: absolute;
            right: 50px;
            top: 10px;

        }
    </style>
    <div>
        {{--所有的视图组件--}}
        <div id="system"></div>

    </div>
    <script type="text/javascript" src="../js/app.js"></script>
    </script>
@endsection

