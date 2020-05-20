import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as dm from 'guans-deltamap';
import axios from "axios";

class DM extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectPlot: 'plot-1',
            filterAlgo: 'number',
            appendValue: '',
            display: 'both',

            viewData:[]
        };

        this.selectPlotHandle = this.selectPlotHandle.bind(this)
        this.filterAlgoHandle = this.filterAlgoHandle.bind(this)
        this.appendValueHandle = this.appendValueHandle.bind(this)
        this.displayHandle = this.displayHandle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        axios.get('/api/ini')
            .then(res=>{
                this.setState({
                    viewData: res.data.data
                })
            })
    }

    selectPlotHandle(event){
        this.setState({selectPlot: event.target.value});
    }

    filterAlgoHandle(event){
        this.setState({filterAlgo: event.target.value});
        if(event.target.value === 'non-interference'){
            $('.form-control').attr('disabled',true);
        }
    }

    appendValueHandle(event){
        this.setState({appendValue: event.target.value});
    }

    displayHandle(event){
        this.setState({display: event.target.value});
    }

    handleSubmit(event){
        dm.varia(this.state.viewData);
        event.preventDefault();
    }


    render() {
        return (
            // {{--        左侧的控制面板--}}
            <div className="d-flex flex-row dmsystem">
                <div className="container-left d-flex flex-column justify-content-around">

                    {/*{{-- 数据统计视图--}}*/}
                    <svg height="140px"></svg>


                    <table className="table table-bordered table-sm table-responsive">
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
                        <select className="custom-select-sm custom-select col-sm-8 pull-right"
                                value={this.state.selectPlot}
                                onChange={this.selectPlotHandle}
                        >
                            <option>plot-1</option>
                            <option>plot-2</option>
                            <option>plot-3</option>
                            <option>plot-4</option>
                        </select>
                    </div>

                    <div>
                        <label className="control-label myLabel pull-left">Filter algo</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right " id="algo"
                                value={this.state.filterAlgo}
                                onChange={this.filterAlgoHandle}
                        >
                            <option>number</option>
                            <option>minimal value</option>
                            <option>non-interference</option>
                        </select>
                    </div>

                    <div>
                        <label className="control-label myLabel">Value</label>
                        <input type="text" className="form-control col-6 pull-right"
                               value={this.state.appendValue}
                               onChange = {this.appendValueHandle}
                        />
                    </div>

                    <div onChange={this.displayHandle}>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="onlyInc" id="customRadio1" name="customRadio" className="custom-control-input" />
                            <label className="custom-control-label myText" htmlFor="customRadio1">Only Inc</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="onlyDec" id="customRadio2" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio2">Only Dec</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="both" id="customRadio3" name="customRadio" className="custom-control-input" defaultChecked/>
                            <label className="custom-control-label myText" htmlFor="customRadio3">Both</label>
                        </div>
                    </div>

                    <button type="button" onClick={this.handleSubmit}>Update DeltaMap</button>
                </div>

                {/*{{--右侧的dm视图和下方的统计--}}*/}
                <div className="bg-danger container-right flex-grow-1 d-flex flex-column">


                    {/*{{-- dm视图--}}*/}
                    <div className="bg-info dm">
                        dm-chart
                        i'm {this.props.date}
                        {/*<iframe src="/iframe" frameBorder="0" width='960px' height='600px'>*/}
                        {/*    <p>您的浏览器不支持  iframe 标签。</p>*/}
                        {/*</iframe>*/}
                        <button>数据</button>
                    </div>


                    {/*{{-- 数据统计视图--}}*/}
                    <div className="bg-secondary chart flex-grow-1">
                        bar-chart
                    </div>

                </div>
            </div>
        );
    }
}

export default DM;

if (document.getElementById('system')) {
    ReactDOM.render(<DM/>, document.getElementById('system'));
}
