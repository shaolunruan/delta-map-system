import * as dm from '../libs/guans-deltamap/deltamap.min.js';
import { vis } from '../libs/guans-deltamap/vis'
import * as d3 from 'd3';

import updateInfo from "./parts/updateInfo";

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

    /*draw the plot*/
    vis(svg, data, o, r, add)


    /*
    更新右侧的示数组件
    * */
    updateInfo('detail')
};

