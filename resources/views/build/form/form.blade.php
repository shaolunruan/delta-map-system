@extends('build.form.master')
@section('content')
    <link rel="stylesheet" href="/css/build.css">
    <link rel="stylesheet" href="/less\buildSupp.css">
    <link rel="stylesheet" href="\css\btcolorpicker\css\bootstrap-colorpicker.min.css">
    <script src="/css/jquery.js"></script>
    <script src="\css\btcolorpicker\js\bootstrap-colorpicker.js"></script>
    <style>
        .content .form-horizontal .item{
            /*display: none;*/
            padding: 15px;
        }
    </style>

    @if(Session::get('message'))
        <div class="alert alert-success" role="alert"
        style="padding-top: 20px;
        margin-bottom: -20px;
        ">
            {{Session::get('message')}}
        </div>
    @endif


    <div class="children">
        <ul class="nav nav-tabs">
            <li role="presentation"><a href="/build/upload">Step1</a></li>
            <li role="presentation" class="active"><a href="#">Step2</a></li>
        </ul>

        <form class="form-horizontal" name="form" action="" method="post">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" name="email" placeholder="Email">
                </div>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Data Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="data_name" placeholder="Data Name">
                </div>
            </div>

            <div class="item">
                <label for="inputEmail3" class="col-sm-2 control-label">Stage 1</label>
                @if(Session::has('keys'))
                    @foreach(Session::get('keys') as $key)
                        <label class="radio-inline">
                            <input type="radio" name="stage1" value="{{$key}}"> {{$key}}
                        </label>
                    @endforeach
                @else
                    <div class="alert alert-danger" role="alert"
                         style="padding-top: 20px;
        margin-bottom: -20px;
        ">
                        The STAGE1 can not be handled. Please check the valid datafile sample.
                    </div>
                @endif
            </div>


            <div class="item">
                <label for="inputEmail3" class="col-sm-2 control-label">Stage 2</label>
                @if(Session::has('keys'))
                    @foreach(Session::get('keys') as $key)
                        <label class="radio-inline">
                            <input type="radio" name="stage2" value="{{$key}}"> {{$key}}
                        </label>
                    @endforeach
                @else
                    <div class="alert alert-danger" role="alert"
                         style="padding-top: 20px;
        margin-bottom: -20px;
        ">
                        The STAGE2 can not be handled. Please check the valid datafile sample.
                    </div>
                @endif
            </div>

            <div class="item">
                <label for="inputEmail3" class="longer-label col-sm-2 control-label">Increment</label>
                <div id="cp1" class="input-group colorpicker-component">
                    <input type="text" value="#439d53" class="form-control" name="incrementColor"/>
                    <span class="input-group-addon"><i></i></span>
                </div>
            </div>
            <script>
                $(function() {
                    $('#cp1').colorpicker({
                        color: '#439d53',
                        format: 'rgb'
                    });
                });
            </script>

            <div class="item">
                <label for="inputEmail3" class="longer-label col-sm-2 control-label">Decrement</label>
                <div id="cp2" class="input-group colorpicker-component">
                    <input type="text" value="#d63737" class="form-control" name="decrementColor"/>
                    <span class="input-group-addon"><i></i></span>
                </div>
            </div>
            <script>
                $(function() {
                    $('#cp2').colorpicker({
                        color: '#d63737',
                        format: 'rgb'
                    });
                });
            </script>

            <div class="item">
                <label for="inputEmail3" class="longer-label col-sm-2 control-label">Model</label>
                <select class="form-control" name="mode">
                    <option>Continuous Distribution</option>
                    <option>Discrete Distribution</option>
                </select>
            </div>

            <div class="item">
                <label for="inputEmail3" class="longer-label col-sm-2 control-label">Filter Mode</label>
                <select class="form-control" id="filtermode" name="filterMode">
                    <option value="Number" >Based on Number</option>
                    <option value="Value">Based on Value</option>
                    <option value="Algorithm">Based on Algorithm</option>
                </select>
            </div>

            <div class="form-group setNumber item" style="display:block">
                <label class="col-sm-2 control-label">Filtering Number</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputEmail" name="number">
                </div>
            </div>

            <div class="form-group setValue item" style="display:none">
                <label class="col-sm-2 control-label">Minimum Value</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputEmail" name="number">
                </div>
            </div>

            <div class="form-group setAlgorithm item" style="display:none">
                <label class="col-sm-2 control-label">Algorithm</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputEmail" name="algorithm">
                </div>
            </div>
            <script>
                document.form.filtermode.onclick = function(){
                    if(document.form.filtermode.value === 'Number'){
                        document.querySelector('.setNumber').style.display = 'block';
                        document.querySelector('.setValue').style.display = 'none'
                        document.querySelector('.setAlgorithm').style.display = 'none'
                    }else if(document.form.filtermode.value === 'Value'){
                        document.querySelector('.setValue').style.display = 'block';
                        document.querySelector('.setNumber').style.display = 'none'
                        document.querySelector('.setAlgorithm').style.display = 'none'
                    }else{
                        document.querySelector('.setAlgorithm').style.display = 'block'
                        document.querySelector('.setValue').style.display = 'none';
                        document.querySelector('.setNumber').style.display = 'none'
                    }
                }
            </script>

            {{csrf_field()}}
            <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </form>

    </div>

@endsection

