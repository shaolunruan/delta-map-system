import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as dm from '../../libs/guans-deltamap/deltamap.min.js'
import axios from "axios";

import {initChartTop, getOptionChartTop} from '../../functions/chartTop'
import {initChartBottom, getOptionChartBottom} from "../../functions/chartBottom";
import initChartDM from "../../functions/chartDM";

export default class DM extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectPlot: '',
            filterAlgo: 'number',
            appendValue: '',
            display: 'both',

            hover:{},

            initData:[],
            viewData: [],

            flagUpdate:false,
            flagAll:false,
            flagOnlyHL:false,
        };

        this.selectPlotHandle = this.selectPlotHandle.bind(this)
        this.filterAlgoHandle = this.filterAlgoHandle.bind(this)
        this.appendValueHandle = this.appendValueHandle.bind(this)
        this.displayHandle = this.displayHandle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAll = this.handleAll.bind(this);
        this.handleOnlyHL = this.handleOnlyHL.bind(this)

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
        let self = this
        initChartTop('topChart', getOptionChartTop(this.state.viewData, this.state.selectPlot), this.state.viewData);
        initChartBottom('bottomChart', getOptionChartBottom(this.state.initData), this.state.initData);
        this.state.selectPlot === '' ?
            initChartDM('dm-svg', this.state.viewData) :
            initChartDM('dm-svg', this.state.viewData, this.state.selectPlot);

        /*
        * 处理暴露于全局的变量links，link_d，将mouseover的值在setState中设置，以便于在panel中显示
        * */
        this.setStateHover();

        /*
        * 初始化flag
        * */
        this.setState({
            flagUpdate: false,
            flagAll: false,
            flagOnlyHL:false
        })

        /*
        * 按下update DM之后触发的事件
        * */
        this.setState({
            flagUpdate: true,
            flagAll: true
        })
        //TODO:不知道为什么这样的样式更改并没有生效
        document.getElementById('switchOption1').style.display = 'none';
        /*下面的代码生效了*/
        // document.getElementById('loading').style.display = 'none';
        $("#loading").fadeOut();
    }

    handleAll(){
        if(!this.state.flagUpdate){
            alert('Please update the deltamap first.')
        }
        if(this.state.flagOnlyHL&&!this.state.flagAll){
            document.getElementById('showAll').style.display = 'block';
            document.getElementById('showHL').style.display = 'none';

            this.setState({
                flagAll : true,
                flagOnlyHL : false,
            })

        }
    }

    handleOnlyHL(){
        if(!this.state.flagUpdate){
            alert('Please update the deltamap first.')
        }
        if(!this.state.flagOnlyHL&&this.state.flagAll){
            document.getElementById('showAll').style.display = 'none';
            document.getElementById('showHL').style.display = 'block';

            this.setState({
                flagOnlyHL : true,
                flagAll : false,
            })
        }

    }

    setStateHover(){
        let self = this;

        links.on('mouseover', function (d) {
            self.setState({
                hover: {
                    name: d[0].name,
                    v1: d[0].from,
                    v2: d[0].to,
                    delta: d[0].delta
                }
            })
        })

        link_d.on('mouseover', function (d) {
            self.setState({
                hover: {
                    name: d[0].name,
                    v1: d[0].from,
                    v2: d[0].to,
                    delta: d[0].delta
                }
            })
        })
    }
    componentDidMount() {
        /*get id from laravel blade*/
        let id = $('#system').attr("data-text");
        axios.get(`/api/${id}`)
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
        if(this.state.selectPlot.length === 0){
            type = null
        }else{
            type = <span
            style={{'color': "#74e1f7",'fontSize':'0.9em'}}
            >{typeof this.state.initData[0][this.state.selectPlot]}</span>
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
                <div className="container-right flex-grow-1 d-flex flex-column">


                    {/*{{-- dm视图--}}*/}
                    <div className="dm">

                        <i className="fa fa-lock" id={'loading'} aria-hidden="true"></i>
                        <svg id="dm-svg"></svg>

                        {/*切换显示全部ego还是highlighted ego*/}
                        <div className="switch btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-light active">
                                <input type="radio" name="options" id={"switchOption1"} onClick={this.handleAll} /> All
                            </label>
                            <label className="btn btn-light">
                                <input type="radio" name="options" id={"switchOption2"} onClick={this.handleOnlyHL}/> Only HL
                            </label>
                        </div>

                        {/*dm图右侧的参数展示区域*/}
                        <div className="right-dm pull-right d-flex flex-column">
                            <div className="detail">
                                <table className="table table-sm table-secondary table-bordered">
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'center', width: '100px'}}>Name</td>
                                        <td style={{textAlign: 'center'}}>{this.state.hover.name}</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign: 'center'}}>V-1</td>
                                        <td style={{textAlign: 'center'}}>{this.state.hover.v1}</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign: 'center'}}>V-2</td>
                                        <td style={{textAlign: 'center'}}>{this.state.hover.v2}</td>
                                    </tr>
                                    <tr>
                                        <th style={{textAlign: 'center'}}>delta</th>
                                        <td style={{textAlign: 'center'}}>{this.state.hover.delta}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="sensitivity-stats">
                                <div className='sensitivity-stats-text'>Counter</div>
                                <div className="counter pull-right display-2" id={'counterid'}></div>
                            </div>
                            <div className="snCounter flex-grow-1" id={'snCounter'}></div>
                            <div className="intersection"></div>
                        </div>
                    </div>


                    {/*{{-- 数据统计视图--}}*/}
                    <div className="chart flex-grow-1" id='bottomChart'></div>

                </div>
            </div>
        );
    }
}

if (document.getElementById('system')) {
    ReactDOM.render(<DM />, document.getElementById('system'));
}
