@extends('gallery.dmsystem.master')
@section('content')
    {{--    import bootstrap4--}}
    <link rel="stylesheet" href="/css/bootstrap4.min.css">
    <script src="/js/library/jquery.slim.min.js"></script>
    <script src="/js/library/popper.min.js"></script>
    <script src="/js/library/bootstrap.min.js"></script>
    <style>
        .dmsystem {
            height: 80vh;
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
            padding: 15px;
        }
        .container-left div{
            margin: 2px
        }
        .dm{
            min-height: 60vh;
        }
        .chart{
            border-top: solid 1px #d8d8d8;
        }
        .dmsystem .container-left svg{
            background: #0f6674;
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
            background-color: #4737ff;
            border-color: #4737ff;
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
    </style>
    <div>
        {{--所有的视图组件--}}
        <div id="system"></div>

    </div>
    <script type="text/javascript" src="../js/app.js"></script>
    </script>
@endsection

