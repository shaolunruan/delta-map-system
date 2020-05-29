import echarts from 'echarts';
import * as d3 from 'd3';


function initChartTop(domId,option,data){
    let topChart = echarts.init(document.getElementById(domId))
    /*刷新重置view，使之有重新刷新的效果*/
    topChart.clear();
    topChart.setOption(option)


    // Enable data zoom when user click bar.
    let zoomSize = 6;
    let xAxisData = data.link.reduce((prev,cur)=>{
        prev.push(cur.name);
        return prev;
    },[])

    /*控制bar chart的缩放函数*/
    topChart.on('click', function (params) {
        topChart.dispatchAction({
            type: 'dataZoom',
            startValue: xAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: xAxisData[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
}

let data = {
    link:[]
}


/*这是对topChart的初始值设置，之后在组件加载完毕请求数据之后，会重新设置option的值*/

/*这是对topChart的初始值设置，之后在组件加载完毕请求数据之后，会重新设置option的值*/
/*
* 自动识别第三个参数的值，
* 不填，默认没有add属性，渲染为统一颜色
* 为boolean值，渲染成 0 1 颜色
* 为Number，渲染成渐变颜色
* */
let getOptionChartTop =(data=data,add=false)=> {
    let xAxisData = data.link.reduce((prev,cur)=>{
        prev.push(cur.name);
        return prev;
    },[])

    let yAxisData = data.link.reduce((prev,cur)=>{
        prev.push(cur.delta);
        return prev;
    },[])

    const colorBoolean = ['#b2bec3','#2d3436']

    const colorNumber = d3.scaleSequential(d3.interpolateLab('#d9eaf7', '#1B9CFC'))
        .domain(d3.extent(data.link.reduce((prev,cur)=>{
            prev.push(cur[add])
            return prev
        },[])));


    return {
        title: {
            text: 'Delta Stats - Click Zoom',
            textStyle:{
                color: '#999',
                fontWeight: 'normal',
                fontSize: 14,
                lineHeight: 8
            },
            left:'center'
        },
        //默认bar的颜色
        color: ['#6c5ce7'],
        xAxis: {
            data: xAxisData,
            axisLabel: {
                show:true
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            },
            formatter(params){
                return `
                    name: ${params.name}</br>
                    delta: ${params.data}
                `
            }
        },
        series: [
            {
                data: yAxisData,
                type: 'bar',
                /*判断顺序：有无add，是否是boolean值，else*/
                itemStyle:!add?null:(typeof data.link[0][add] === 'boolean'?
                        {
                            normal: {
                                //每根柱子颜色设置
                                color: function(params) {
                                    return data.link[params.dataIndex][add]?colorBoolean[1]:colorBoolean[0];
                                }
                            }
                        }
                        :
                        {
                            normal: {
                                color:function(params){
                                    return colorNumber(data.link[params.dataIndex][add]);
                                }
                            }
                        }
                )
            }
        ],
        grid: {
            x: 30,
            y: 20,
            x2: 30,
            y2: 20
        }
    }
}

export {
    initChartTop,
    getOptionChartTop
}
