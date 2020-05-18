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
            width: 85vw;
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
        .dm{
            min-height: 60vh;
        }
        .chart{
            border-top: solid 1px #d8d8d8;
        }
        .dmsystem>.container-left>svg{
            background: #0f6674;
        }
        .dmsystem>.container-left>.name-display{
            border: solid 1px #f8f9fa;
            border-radius: .5em;
            background: #f8f9fa;
            font-size: 1.2em;
            padding: 5px;
        }
        .dmsystem>.container-left>table{
            border: solid 1px #d8d8d8;
            border-radius: .5em;
            height: 140px;
            font-size: .7em;
            font-weight: lighter;
            margin-bottom: 0;
        }
        .dmsystem>.container-left .myLabel {
            font-family: 'Nunito', sans-serif;
            font-weight: normal;
            font-size: .9em;
        }
        .dmsystem>.container-left .myText{
            font-family: 'Nunito', sans-serif;
            font-weight: normal;
            font-size: .8em;
        }
        .dmsystem>.container-left>button {
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
        .dmsystem>.container-left .custom-control-inline{
            margin-right: 9px;
        }
    </style>
    <div class="d-flex flex-row dmsystem">
{{--        左侧的控制面板--}}
        <div class="container-left d-flex flex-column justify-content-around">
            <svg height="140px"></svg>

            <table class="table table-light table-bordered table-sm table-responsive">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                </tbody>
            </table>

            <hr class="text-center">

            <div class="text-center text-info name-display">
                name display
            </div>

            <div>
            <label class="control-label myLabel pull-left">Select plot</label>
            <select class="custom-select-sm custom-select col-sm-8 pull-right">
                <option>plot-1</option>
                <option>plot-2</option>
                <option>plot-3</option>
                <option>plot-4</option>
            </select>
            </div>

            <div>
                <label class="control-label myLabel pull-left">Filter algo</label>
                <select class="custom-select-sm custom-select col-sm-8 pull-right " id="algo">
                    <option>number</option>
                    <option>minimal value</option>
                    <option>non-interference</option>
                </select>
            </div>
            <script>
                // $('#algo').attr('disabled',true)
            </script>

            <div>
                <label class="control-label myLabel">Number to filter</label>
                <input type="text" class="form-control col-4 pull-right">
            </div>

            <div>
            <div class="custom-control custom-radio custom-control-inline" >
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                <label class="custom-control-label myText" for="customRadio1">Only Inc</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                <label class="custom-control-label myText" for="customRadio2">Only Dec</label>
            </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
                    <label class="custom-control-label myText" for="customRadio3">Both</label>
                </div>
            </div>




            <button type="button">Update DM</button>
        </div>

{{--        右侧的dm视图和下方的统计--}}
        <div class="bg-danger container-right flex-grow-1 d-flex flex-column">
            {{-- dm视图--}}
            <div class="bg-info dm">
                dm-chart
            </div>
            {{-- 数据统计视图--}}
            <div class="bg-secondary chart flex-grow-1">
                bar-chart
            </div>
        </div>
        <div id="example"></div>
    </div>
    <script type="text/javascript" src="../js/app.js"></script>
    </script>
@endsection

