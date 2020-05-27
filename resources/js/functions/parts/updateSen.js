import echarts from 'echarts';
import {extent} from 'd3';

function updateSnCounter(domId,option){
    let snCounterChart = echarts.init(document.getElementById(domId))
    /*刷新重置view，使之有重新刷新的效果*/
    snCounterChart.clear()
    snCounterChart.setOption(option);
}


function getOptionSnCounter(data){

    return {
        title: {
            text: 'Ego Highlighted Chart',
            left: 'center',
            top: 10,
            textStyle: {
                color: '#6f6e6e',
                fontWeight:'normal',
                fontSize:13
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
            show: false,
            min: calRange(data)[0],
            max: calRange(data)[1],
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: 'Hightlighted Ego',
                type: 'pie',
                radius: '70%',
                center: ['50%', '60%'],
                data: data.map(d => {
                    return {
                        name: d[0].name,
                        value: d[0].delta
                    }
                }).sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(127,126,126,0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(26,26,26,0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#5c31c2',
                    shadowBlur: 150,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'circularOut',
                animationDelay: function (idx) {
                    return Math.random() * 0.1;
                }
            }
        ]
    }
}

function calRange(data){
    let [min,max] = extent(data.reduce((prev,cur)=>{
        prev.push(cur[0].delta)
        return prev;
    },[]))

    return [0.8*min,1.3*max]
}

export {
    updateSnCounter,
    getOptionSnCounter
}
