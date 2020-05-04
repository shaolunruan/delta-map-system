@extends('build.upload.master')
@section('content')
    <link rel="stylesheet" href="/css/build.css">
    <link rel="stylesheet" href="\less\buildSupp.css">
    <script>
        {{--if({{$errorInfo}} == undefined){--}}
        {{--    document.querySelector('.errorInfo').style.display = 'block'--}}
        {{--}else{--}}
        {{--    document.querySelector('.errorInfo').style.display = 'none'--}}
        {{--}--}}
    </script>

    <div class="children">
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Step1</a></li>
                <li role="presentation"><a href="/build/form">Step2</a></li>
            </ul>

        @foreach($errors->all() as $error)
            <p class="bg-danger">{{ $error }}</p>
        @endforeach

        <div class="upload">
            <form action="" method="post" enctype="multipart/form-data">
                <input type="file" id="exampleInputFile" name="dataFile">
                <p class="help-block">Please upload your data file to be visualized.</p>
                <p class="help-block">Support .json .csv, etc.</p>
                {{csrf_field()}}
                <button type="submit" class="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    </div>

@endsection

