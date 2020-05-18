import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Chart from "./Chart.jsx";
import StatisticBottom from './StatisticBottom'
import StatisticTop from "./StatisticTop";

class DM extends Component{
    render() {
        return (
            // {{--        左侧的控制面板--}}
            <div className="d-flex flex-row dmsystem">
                <div className="container-left d-flex flex-column justify-content-around">

                    <StatisticTop/>

                    <table className="table table-light table-bordered table-sm table-responsive">
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

                    <hr className="text-center"/>

                    <div className="text-center text-info name-display">
                        name display
                    </div>

                    <div>
                        <label className="control-label myLabel pull-left">Select plot</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right">
                            <option>plot-1</option>
                            <option>plot-2</option>
                            <option>plot-3</option>
                            <option>plot-4</option>
                        </select>
                    </div>

                    <div>
                        <label className="control-label myLabel pull-left">Filter algo</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right " id="algo">
                            <option>number</option>
                            <option>minimal value</option>
                            <option>non-interference</option>
                        </select>
                    </div>

                    <div>
                        <label className="control-label myLabel">Number to filter</label>
                        <input type="text" className="form-control col-4 pull-right"/>
                    </div>

                    <div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio1">Only Inc</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio2">Only Dec</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio3">Both</label>
                        </div>
                    </div>
                    <button type="button">Update DM</button>
                </div>

                {/*{{--右侧的dm视图和下方的统计--}}*/}
                <div className="bg-danger container-right flex-grow-1 d-flex flex-column">

                    <Chart/>

                    <StatisticBottom/>

                </div>
            </div>
        );
    }
}

export default DM;

if (document.getElementById('dm')) {
    ReactDOM.render(<DM/>, document.getElementById('dm'));
}
