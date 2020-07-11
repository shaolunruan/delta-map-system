import echarts from 'echarts';
import * as dm from 'guans-deltamap'

function initChartBottom(domId,option,data){
    let bottomChart = echarts.init(document.getElementById(domId))
    /*刷新重置view，使之有重新刷新的效果*/
    bottomChart.clear()
    bottomChart.setOption(option);

    bottomChart.on('click',function(params){
        if(params.componentType === 'title'){
            echarts.init(document.getElementById('zoom-in-chart')).clear();
            echarts.init(document.getElementById('zoom-in-chart')).setOption(option)
            document.getElementById('zoom-in').style.display = 'block';
        }
    })

    // Enable data zoom when user click bar.
    let zoomSize = 6;
    let xAxisData = data.reduce((prev,cur)=>{
        prev.push(cur.name);
        return prev;
    },[])

    /*控制bar chart的缩放函数*/
    bottomChart.on('click', function (params) {
        bottomChart.dispatchAction({
            type: 'dataZoom',
            startValue: xAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: xAxisData[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
}

let getOptionChartBottom =(data=data)=> {
    let [name, start, end] = Object.keys(data[0])

    let xAxisData = data.reduce((prev,cur)=>{
        prev.push(cur[name]);
        return prev;
    },[])


    // let yAxisData = data.link.reduce((prev,cur)=>{
    //     prev.push(cur.from);
    //     return prev;
    // },[])

    return {
        title: {
            text: 'Values Between Two Stages',
            textStyle:{
                color: '#999',
                fontWeight: 'normal',
                fontSize: 16,
                lineHeight: 15
            },
            left:'left',
            triggerEvent:true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        legend: {
            data: ['Stage_1', 'Stage_2']
        },
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Stage_1',
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.6, color: '#79bffb'},
                            {offset: 1, color: '#ff7675'}
                        ]
                    )
                },
                data: data.reduce((prev,cur)=>{
                    prev.push(cur[start]);
                    return prev;
                },[])
            },
            {
                name: 'Stage_2',
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#128df7'},
                            {offset: 0.6, color: '#128df7'},
                            {offset: 1, color: '#ff7675'}
                        ]
                    )
                },
                data: data.reduce((prev,cur)=>{
                    prev.push(cur[end]);
                    return prev;
                },[])
            }
        ],
        grid: {
            x: 80,
            y: 30,
            x2: 80,
            y2: 20,
        }
    }
}

export {
    initChartBottom,
    getOptionChartBottom
}
