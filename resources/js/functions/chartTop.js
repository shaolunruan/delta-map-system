import echarts from 'echarts';

function initChartTop(domId,option,data){
    let topChart = echarts.init(document.getElementById(domId))
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
let getOptionChartTop =(data=data)=> {
    let xAxisData = data.link.reduce((prev,cur)=>{
        prev.push(cur.name);
        return prev;
    },[])

    let yAxisData = data.link.reduce((prev,cur)=>{
        prev.push(cur.delta);
        return prev;
    },[])

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
            type: 'bar'
        }],
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
