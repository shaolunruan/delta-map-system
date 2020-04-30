@extends('build.form.master')
@section('content')
    <link rel="stylesheet" href="/css/_build.css">
    <link rel="stylesheet" href="\css\btcolorpicker\css\bootstrap-colorpicker.min.css">
    <script src="/css/jquery.js"></script>
    <script src="\css\btcolorpicker\js\bootstrap-colorpicker.js"></script>
    <style>
        .content .form-horizontal .item{
            /*display: none;*/
            padding: 15px;
        }
    </style>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
        </div>

        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Data Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail" placeholder="Data Name">
            </div>
        </div>

        <div class="item">
            <label for="inputEmail3" class="col-sm-2 control-label">Stage 1</label>
            <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> name
            </label>
        </div>

        <div class="item">
            <label for="inputEmail3" class="col-sm-2 control-label">Stage 2</label>
            <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions—" id="inlineRadio1" value="option1"> name
            </label>
        </div>

        <div class="item">
            <label for="inputEmail3" class="longer-label col-sm-2 control-label">Increment</label>
            <div id="cp1" class="input-group colorpicker-component">
                <input type="text" value="#00AABB" class="form-control" />
                <span class="input-group-addon"><i></i></span>
            </div>
        </div>
        <script>
            $(function() {
                $('#cp1').colorpicker({
                    color: '#AA3399',
                    format: 'rgb'
                });
            });
        </script>

        <div class="item">
            <label for="inputEmail3" class="longer-label col-sm-2 control-label">Decrement</label>
            <div id="cp2" class="input-group colorpicker-component">
                <input type="text" value="#00AABB" class="form-control" />
                <span class="input-group-addon"><i></i></span>
            </div>
        </div>
        <script>
            $(function() {
                $('#cp2').colorpicker({
                    color: '#AA3399',
                    format: 'rgb'
                });
            });
        </script>

        <div class="item">
            <label for="inputEmail3" class="longer-label col-sm-2 control-label">Model</label>
            <select class="form-control">
                <option>Continuous Distribution</option>
                <option>Discrete Distribution</option>
            </select>
        </div>


        {{csrf_field()}}
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
    </form>

@endsection

