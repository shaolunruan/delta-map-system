import * as dm from '../libs/guans-deltamap/deltamap.min.js';
import { vis } from '../libs/guans-deltamap/vis'
import {vis_for_HL} from "../libs/guans-deltamap/vis_for_HL";
import * as d3 from 'd3';

// import updateInfo from "./parts/updateInfo";
import { updateSnCounter, getOptionSnCounter } from "./parts/updateSen";

export default function initChartDM(domId = null, data = null,add=false,self) {
    let svg = d3.select(`#${domId}`)
        .attr('width', '100%')
        .attr('height', '100%')

    /*定义control panel的宽度*/
    let ctrlpnlWidth = 250

    /*定义圆心的初始值*/
    let xo = (document.getElementsByClassName('dm')[0].clientWidth-ctrlpnlWidth)/2
    let yo = document.getElementsByClassName('dm')[0].clientHeight/2
    let o = [xo,yo]

    /*定义外圆和内圆的半径*/
    let xr = 0.87*yo;
    let yr = 0.30*yo;
    let r = [xr,yr]

    /*设置highlight ego的数组，在vis中设置，再传入updateSnCounter()*/
    let snArr = [];
    window.snArr = snArr;

    /*draw the plot*/
    vis(svg, data, o, r, add)

    /*Add another plot to show HL ego instead of all ego*/
    vis_for_HL(svg, data, o, r, add)

    /*
    更新右侧的第三个示数组件
    * */
    updateSnCounter('snCounter', getOptionSnCounter(snArr))
};

