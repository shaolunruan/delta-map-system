@extends('gallery.index.master')
@section('content')
{{--    import bootstrap4--}}
<link rel="stylesheet" href="/css/bootstrap4.min.css">
<script src="/js/library/jquery.slim.min.js"></script>
<script src="/js/library/popper.min.js"></script>
<script src="/js/library/bootstrap.min.js"></script>
<style>
    .card{
        position:relative;
        margin:10px;
        margin-top:40px;
    }
    .list-group {
        margin-top: 40px;
        height: 30%;
        position: flex;
        flex-direction: column;
        /*justify-content: ;*/
    }
    .list-group>button{
        flex:1
    }
    header .left a:nth-child(2) span{
        color: #FFF;
        border-radius: 1em;
        background: #4737ff;
    }
</style>

<div class="list-group col-2">
    <button type="button" class="list-group-item list-group-item-action">
        <a href={{route('gallery.category',['cate'=>'normal'])}}>Normal</a>
        <span class="badge badge-primary badge-pill">3</span>

    </button>
    <button type="button" class="list-group-item list-group-item-action">
        <a href={{route('gallery.category',['cate'=>'clustering'])}}>Clustering</a>
        <span class="badge badge-primary badge-pill">1</span>
    </button>
    <button type="button" class="list-group-item list-group-item-action">
        <a href={{route('gallery.category',['cate'=>'analysis'])}}>Analysis</a>
        <span class="badge badge-primary badge-pill">1</span>
    </button>
    <button type="button" class="list-group-item list-group-item-action">
        <a href={{route('gallery.category',['cate'=>'quantitative'])}}>Quantitative</a>
        <span class="badge badge-primary badge-pill">1</span>
    </button>
</div>


<div class="container col-10">
    <div class="row">
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/bacteria.jpg" height="40%" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="{{route('gallery.dmsystem',['id'=>1])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/particle.png" height="40%"  alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="{{route('gallery.dmsystem',['id'=>2])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/mip.png" height="40%"  alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">2018-19 NBA MIP</h5>
                <p class="card-text">
                    Analyse the 2018-19 NBA Most Improved Player selection via Delta Map System.
                </p>
                <a href="{{route('gallery.dmsystem',['id'=>'mip'])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/migrant.jpg" height="40%"  alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="{{route('gallery.dmsystem',['id'=>4])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/default.png" height="40%"  alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="{{route('gallery.dmsystem',['id'=>5])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="/static/default.png" height="40%"  alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="{{route('gallery.dmsystem',['id'=>6])}}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
    </div>
</div>
@endsection

