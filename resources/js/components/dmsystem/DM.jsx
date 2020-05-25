import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as dm from '../../libs/guans-deltamap/deltamap.min.js'
import axios from "axios";

import {initChartTop, getOptionChartTop} from '../../functions/chartTop'

class DM extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectPlot: 'Highlight Field',
            filterAlgo: 'number',
            appendValue: '',
            display: 'both',

            initData:[],
            viewData: []
        };

        this.selectPlotHandle = this.selectPlotHandle.bind(this)
        this.filterAlgoHandle = this.filterAlgoHandle.bind(this)
        this.appendValueHandle = this.appendValueHandle.bind(this)
        this.displayHandle = this.displayHandle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    selectPlotHandle(event){
        this.setState({selectPlot: event.target.value});
    }

    filterAlgoHandle(event){
        this.setState({filterAlgo: event.target.value});
        if(event.target.value === 'non-interference'){
            $('.form-control').attr('disabled',true);
        }else{
            $('.form-control').attr('disabled',false);
        }
    }

    appendValueHandle(event){
        this.setState({appendValue: event.target.value});
    }

    displayHandle(event){
        this.setState({display: event.target.value});
    }

    handleSubmit(event) {
        initChartTop('topChart',getOptionChartTop(this.state.viewData),this.state.viewData)
        event.preventDefault();
    }

    componentDidMount() {
        axios.get('/api/ini')
            .then(res=>{
                this.setState({
                    initData: res.data.data,
                    viewData: dm.varia(res.data.data)
                })

                // optionChartTop = update_optionChartTop
                // console.log(optionChartTop)

            })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(!this.state.selectPlot == 'Plot-#'?typeof this.state.initData[0][this.state.selectPlot]:'')
    // }

    render() {
        /*条件渲染表头*/
        let th;
        if (this.state.initData.length === 0) {
            th = <th>#</th>
        } else {
            th = dm.getFields(this.state.initData).map((d, i) => {
                return <th scope="col" key={i}>{d}</th>
            })
        }

        /*条件渲染表格*/
        let tr;
        if (this.state.initData.length === 0) {
            tr = <tr>
                <th>#</th>
            </tr>
        } else {
            tr = this.state.initData.map((tr, i) => {
                return (
                    <tr key={i}>
                        {Object.values(tr).map((d, j) => {
                            if (typeof d == 'boolean') {
                                return <td key={j}>{d === true ? '√' : 'x'}</td>
                            } else {
                                return <td key={j}>{d}</td>
                            }
                        })}
                    </tr>
                )
            })
            // <tr>
            //     <th scope="row">1</th>
            //     <td>Mark</td>
            //     <td>Otto</td>
            //     <td>@mdo</td>
            // </tr>
        }

        /*条件渲染select plot*/
        let selection;
        if (this.state.initData.length === 0) {
            selection = <option value="">Data parsing error!</option>
        } else {
            selection = dm.getAddFields(this.state.initData).map((d, i) => {
                return <option key={i}>{d}</option>
            })
        }

        /*条件渲染display名称的类型*/
        let type;
        if(this.state.selectPlot !== 'Highlight Field'){
            type = <span
            style={{'color': "#74e1f7",'fontSize':'0.9em'}}
            >{typeof this.state.initData[0][this.state.selectPlot]}</span>
        }else{
            type = null
        }

        return (
            // {{-- 左侧的控制面板--}}
            <div className="d-flex flex-row dmsystem">
                <div className="container-left d-flex flex-column justify-content-around">

                    {/*{{-- 数据统计视图--}}*/}
                    <div id='topChart'></div>


                    <table className="table table-bordered table-sm table-responsive">
                        <thead>
                        <tr>
                            {th}
                        </tr>
                        </thead>
                        <tbody>
                        {tr}
                        </tbody>
                    </table>

                    <hr className="text-center"/>

                    <div className="text-center text-info name-display">
                        {type} {this.state.selectPlot}
                    </div>

                    <div>
                        <label className="control-label myLabel pull-left">Select plot</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right"
                                value={this.state.selectPlot}
                                onChange={this.selectPlotHandle}
                        >
                            {selection}
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
                               onChange={this.appendValueHandle}
                        />
                    </div>

                    <div onChange={this.displayHandle}>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="onlyInc" id="customRadio1" name="customRadio"
                                   className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio1">Only Inc</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="onlyDec" id="customRadio2" name="customRadio"
                                   className="custom-control-input"/>
                            <label className="custom-control-label myText" htmlFor="customRadio2">Only Dec</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="both" id="customRadio3" name="customRadio"
                                   className="custom-control-input" defaultChecked/>
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
                        <button>更新</button>
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
