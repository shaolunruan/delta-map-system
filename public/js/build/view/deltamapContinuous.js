//TODO:
/* 变量的声明：
dataOriginExample原数组，dataOrigin中间数组，dataOutput最终格式化的数组用于构造位置信息
火柴的颜色比例尺：colorMatchASC增长 colorMatchDESC下降
delta增长的数组asc，delta降低的数组desc
 */
/*
主要函数的声明
format() 返回dataOutput
 */

//定义一下数据源数据
const dataOriginExample = {
    axisnode: [
        //后期用d3.range生成
    ],
    link: [
        {
            name: 'zhangsan',
            start: 90,
            end: 110
        },
        {
            name: 'lisi',
            start: 90,
            end: 110
        },
        {
            name: 'wangwu',
            start: 90,
            end: 110
        },
        {
            name: 'zhaoliu',
            start: 90,
            end: 110
        },
        {
            name: 'ruanqi',
            start: 90,
            end: 110
        },
        {
            name: 'laoba',
            start: 90,
            end: 110
        },
        {
            name: 'qinjiu',
            start: 90,
            end: 110
        },
        {
            name: 'xiaoshi',
            start: 90,
            end: 110
        },
        {
            name: 'woshiele',
            start: 90,
            end: 110
        },
        {
            name: 'iamtwel',
            start: 90,
            end: 110
        },
        {
            name: 'sheishithirt',
            start: 90,
            end: 110
        },
        {
            name: 'iamlast',
            start: 90,
            end: 110
        },
    ]
}

let shuffleFrom = d3.shuffle(d3.range(75, 150))
let shuffleTo = d3.shuffle(d3.range(75, 150))

//自定义demo的原始数组
let dataOrigin = {}
dataOrigin.axisnode = d3.range(151);

dataOrigin.link = d3.range(20).map((d, i) => {
    return {
        name: Math.random().toString(36).slice(-6),
        start: shuffleFrom[i],
        end: shuffleTo[i]
    }
})//到此源数据dataOrigin就已经被定义成功了，这就是假定的虚拟数据源

console.log('dataOrigin', dataOrigin)


//定义一些变量
const width = 960, height = 550,
    outerRadius = 270, innerRadius = 175,
    textBias = 15

//预设一个GUI
let controls = new function () {
    this.innerRadius = innerRadius
    this.strokeWidth = 5
    this.colorAsc = [16, 128, 35, 0.932]
    this.colorDesc = [168, 39, 16, 0.932]
}



//定义环形的映射比例尺
let sqrt = d3.scalePow()
    .exponent(2.5)
    .domain([150, 0])
    .range([0, Math.PI]);
// let sqrt = d3.scaleLinear()
// .domain()
// .range([0, Math.PI])

let dataOutput = format(dataOrigin)
asc = [], desc = []

dataOutput.link.forEach(d => {
    if (d.delta > 0) asc.push(d.delta);
    else desc.push(d.delta)
})

let colorAsc = 'rgba('.concat(controls.colorAsc.join(',')).concat(')')
let colorAsc0 = 'rgba(' + controls.colorAsc[0] + ',' + controls.colorAsc[1] + ',' + controls.colorAsc[2] + ',' + 0.4 + ')'
let colorDesc = 'rgba('.concat(controls.colorDesc.join(',')).concat(')')
let colorDesc0 = 'rgba(' + controls.colorDesc[0] + ',' + controls.colorDesc[1] + ',' + controls.colorDesc[2] + ',' + 0.4 + ')'

let colorMatchASC = d3.scaleSequential(d3.interpolateLab(colorAsc0, colorAsc))
    .domain(d3.extent(asc));
let colorMatchDESC = d3.scaleSequential(d3.interpolateLab(colorDesc, colorDesc0))
    .domain(d3.extent(desc));


//计算交点函数

// function equation(r, x1, y1, x2, y2){
// let x = new Expression('x')

// let y = new Expression('y')
// // let t1 =   algebra.parse(`x-${x1}`).multiply(algebra.parse(`${y2-y1}`))
// let eq = new Equation(algebra.parse(`y-${y1}`).multiply(algebra.parse(`${x2-x1}`)), algebra.parse(`x-${x1}`).multiply(algebra.parse(`${y2-y1}`)))
// let y0 = eq.solveFor('y')

// let eqn = new Equation(x.multiply(x).add(algebra.parse(`${y0}`).multiply(algebra.parse(`${y0}`))),radius*radius)
// let solution = eqn.solveFor('x')
//     let sol1 = nerdamer.solve(`${x2-x1}*(y-${y1}) = ${y2-y1}*(x-${x1})`,'y').toString().slice(1,-1)
//     let solution = nerdamer.solve(`x^2+(${sol1})^2=${r}^2`,'x').toString().slice(1,-1).split(',')
//     return solution.every((item)=>item<r&&item>0)&&solution.length>1&&solution[0]!==solution[1];
// }

//构造数学公式通过求公共解来计算交点的个数

// let unionCounter = dataOutput.link.reduce((prev,cur,i)=>{
//     if(equation(controls.innerRadius, outerRadius*Math.cos(dataOutput.axisnode[cur.fromId].angle), outerRadius*Math.sin(dataOutput.axisnode[cur.fromId].angle), controls.innerRadius*Math.cos(dataOutput.axisnode[cur.toId].angle), controls.innerRadius*Math.sin(dataOutput.axisnode[cur.toId].angle))){
//         return prev+1;
//     }else{
//         return prev;
//     }
// },0)

// let unionCounter = 0
// dataOutput.link.forEach(cur=>{
//     if(equation(controls.innerRadius, outerRadius*Math.cos(dataOutput.node[cur.from].angle), outerRadius*Math.sin(dataOutput.node[cur.from].angle), controls.innerRadius*Math.cos(dataOutput.node[cur.to].angle), controls.innerRadius*Math.sin(dataOutput.node[cur.to].angle))){
//         unionCounter++
//     }
// })

// console.log('   unionCounter', unionCounter)

//定义画布
const svg = d3.select('.dm')
    .append('g')
    .attr('transform', `translate(${width / 4.5},${height / 1.7})`)


//画放射的标识虚线
let radialLine = d3.radialLine()
    .angle(d => d.angle)
    .radius(d => d.radius)

let strokeDataForPolarAxis = dataOutput.axisnode.map((d, i) => {
    return d.tick % 20 == 0 || d.tick == 0 || d.tick == 150 ?
        [
            {
                angle: 0,
                radius: 0
            },
            {
                angle: d.angle,
                radius: outerRadius
            }
        ] : [];
})

svg.append('g')
    .selectAll('.radial-stroke')
    .data(strokeDataForPolarAxis)
    .enter()
    .append('path')
    .attr('class', 'radial-stroke')
    .attr('d', radialLine)

//画outer环形坐标的圆
svg.append('g')
    .attr('class', 'axis-outer')
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(outerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(Math.PI)
    )

//画inner环形坐标的圆
let innerArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius)
    .startAngle(0)
    .endAngle(Math.PI)

let innerCircle = svg.append('g')
    .attr('class', 'axis-inner')
    .append('path')
    .attr('d', innerArc)

//绘制inner坐标上的刻度
let xAxisInner = svg.append("g");

var xTick = xAxisInner
    .selectAll("g")
    .data(sqrt.ticks(30))
    .enter().append("g")
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + ((sqrt(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
    });

xTick.append("line")
    .attr("x2", (d, i) => {
        return d % 20 == 0 || d == 0 || d == 150 ? 7 : 4;
    })
    .attr("stroke", "rgb(82, 79, 79)")
    .attr('stroke-width', d => {
        return d % 20 == 0 || d == 0 || d == 150 ? 2 : 1;
    })

// //绘制outer坐标上的刻度
let xAxisOuter = svg.append("g");

var xOuterTick = xAxisOuter
    .selectAll("g")
    .data(sqrt.ticks(30))
    .enter().append("g")
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
        return "rotate(" + ((sqrt(d)) * 180 / Math.PI - 90) + ")translate(" + outerRadius + ",0)";
    });

xOuterTick.append("line")
    .attr("x2", (d, i) => {
        return d % 20 == 0 || d == 0 || d == 150 ? 7 : 4;
    })
    .attr("stroke", "rgb(82, 79, 79)")
    .attr('stroke-width', d => {
        return d % 20 == 0 || d == 0 || d == 150 ? 2 : 1;
    });

xOuterTick.append("text")
    .attr("transform", function (d) {
        var angle = sqrt(d);
        return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,-14)" : "rotate(-90)translate(0, 18)";
    })
    .text(function (d) {
        return d % 20 == 0 || d == 0 || d == 150 ? d : null;
    })
    .style("font-size", 12)
    .style('font-weight', 500)


//定义tooltip的selection
let div = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

//计算切线长度，来判断线段的交点个数
let tangent = Math.sqrt(outerRadius * outerRadius - controls.innerRadius * controls.innerRadius)
let intersectCounter = 0

//绘制axis之间的link
let dataForRadialLine = dataOutput.link.map((d, i) => {
    return [{
        uid: d.uid,
        name: d.name,
        fromId: d.fromId,
        toId: d.toId,
        fromGrade: d.fromGrade,
        toGrade: d.toGrade,
        delta: d.delta,
        angle: dataOutput.axisnode[d.fromId].angle,
        radius: outerRadius
    }, {
        // uid: d.uid,
        // name: d.name,
        // fromId: d.fromId,
        // toId: d.toId,
        // fromGrade: d.fromGrade,
        // toGrade: d.toGrade,
        // delta: d.delta,
        angle: dataOutput.axisnode[d.toId].angle,
        radius: innerRadius
    }]
})
let link = svg.append('g')
    .selectAll('.link')
    .data(dataForRadialLine)
    .enter()
    .append('path')
    // .each(function(d){d.source = d[0],d.target = d[1]})
    .attr('class', 'link')
    .attr('d', radialLine)
    .attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
    .each(d => {
        if (Math.sqrt(Math.pow(d[0].radius, 2) + (Math.pow(d[1].radius, 2)) - 2 * d[0].radius * d[1].radius * Math.cos(d[0].angle - d[1].angle)) > tangent) {
            intersectCounter++
        }
    })
    .on('mouseover', mouseover)
    .on("mouseout", mouseout)

document.getElementById('counter').innerHTML =intersectCounter


//画D区域的link
let clip = svg.append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('circle')
    .attr('r', innerRadius)

let link_d = svg.append('g')
    .attr('clip-path', 'url(#clip)')
    .selectAll('.link-d')
    .data(dataForRadialLine)
    .enter()
    .append('path')
    // .each(function(d){d.source = d[0],d.target = d[1]})
    .attr('class', 'link-d')
    .attr('d', radialLine)
    .attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
    .attr('stroke-width', 5)
    .on('mouseover', mouseover_d)
    .on("mouseout", mouseout_d)


//配置gui
let gui = new dat.GUI({autoPlace:false})
gui.domElement.id = 'gui';
document.querySelector('.children').appendChild(gui.domElement);

gui.add(controls, 'innerRadius', controls.innerRadius - 60, outerRadius).name('Sensitivity').step(2).onChange(innerRadius => {
    let tangent = Math.sqrt(outerRadius * outerRadius - innerRadius * innerRadius)
    let intersectCounter = 0
    //半圆
    innerArc.innerRadius(innerRadius)
        .outerRadius(innerRadius)

    innerCircle.attr('d', innerArc)
    //刻度
    xTick.attr("transform", function (d) {
        return "rotate(" + ((sqrt(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
    })
    //layer之间的link
    dataForRadialLine.forEach(item => {
        item[1].radius = innerRadius
    })
    link.remove()
    link = svg.append('g')
        .selectAll('.link')
        .data(dataForRadialLine)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', radialLine)
        .each(d => {
            if (Math.sqrt(Math.pow(d[0].radius, 2) + (Math.pow(d[1].radius, 2)) - 2 * d[0].radius * d[1].radius * Math.cos(d[0].angle - d[1].angle)) > tangent) {
                intersectCounter++
            }
        })
        .attr('stroke', d => {
            return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
        })
        .on('mouseover', mouseover)
        .on("mouseout", mouseout)

    // this approach cannot work
    // document.getElementById("myChildren").appendChild(document.createElement("div"));
    document.getElementById('counter').innerHTML = intersectCounter

    //d区域的link
    clip
        .attr('r', innerRadius)

    link_d.remove()
    link_d = svg.append('g')
        .attr('clip-path', `url(#clip)`)
        .selectAll('.link-d')
        .data(dataForRadialLine)
        .enter()
        .append('path')
        .attr('class', 'link-d')
        .attr('d', radialLine)
        .attr('stroke', d => {
            return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
        })
        .attr('stroke-width', controls.strokeWidth)
        // .attr('opacity', 0.1)
        // .style('opacity', 0.01)
        .on('mouseover', mouseover)
        .on("mouseout", mouseout)
})
gui.add(controls, 'strokeWidth', 2.5, 15).name('Filering Width').onChange(strokeWidth => {
    link_d.style('stroke-width', strokeWidth)
})
gui.addColor(controls, 'colorAsc').name('Color of Asc').onChange(e => {
    //修改上升的
    e = round(e)
    colorAsc = 'rgba('.concat(e.join(',')).concat(')')
    colorAsc0 = 'rgba(' + e[0] + ',' + e[1] + ',' + e[2] + ',' + 0.4 + ')'
    colorMatchASC = d3.scaleSequential(d3.interpolateLab(colorAsc0, colorAsc))
        .domain(d3.extent(asc));
    link_d.attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
    link.attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
})
gui.addColor(controls, 'colorDesc').name('Color of Desc').onChange(e => {
    //修改下降的
    e = round(e)
    colorDesc = 'rgba('.concat(e.join(',')).concat(')')
    colorDesc0 = 'rgba(' + e[0] + ',' + e[1] + ',' + e[2] + ',' + 0.4 + ')'
    colorMatchDESC = d3.scaleSequential(d3.interpolateLab(colorDesc, colorDesc0))
        .domain(d3.extent(desc));

    link_d.attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
    link.attr('stroke', d => {
        return d[0].delta > 0 ? colorMatchASC(d[0].delta) : colorMatchDESC(d[0].delta)
    })
})


//交互：tooltip  mouseover
function mouseover(d, i) {
    div.transition()
        .duration(170)
        .style('opacity', 0.9);
    div.html(`Name: ${d[0].name}</br>Period One: ${d[0].fromGrade}</br>Period Two: ${d[0].toGrade}</br>delta: ${d[0].delta}`)
        .style('left', (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    link_d.style('display', 'none')

    // link_d.classed('link-d-hover',(item,i,nodes)=>{
    //     return d.name !== item.name
    // })
    // link.classed('link-hover',   (item,i,nodes)=>{
    //     return d.name !== item.name
    // })
}

function mouseout(d, i) {
    div.transition()
        .duration(500)
        .style("opacity", 0);
    link_d.style('display', 'block')
}

function mouseover_d(d, i) {
    div.transition()
        .duration(170)
        .style('opacity', 0.9);
    div.html(`Name: ${d[0].name}</br>Period One: ${d[0].fromGrade}</br>Period Two: ${d[0].toGrade}</br>delta: ${d[0].delta}`)
        .style('left', (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    link_d.style('display', 'none')
}

function mouseout_d(d, i) {
    div.transition()
        .duration(500)
        .style("opacity", 0);
    link_d.style('display', 'block')
}


//对数组的元素进行四舍五入的函数
function round(arr) {
    return arr.map(d => {
        return Math.round(d)
    })
}

//定义格式化函数
function format(example) {
    let data = {}

    data.axisnode = example.axisnode.map((d, i) => {
        return {
            uid: i,
            tick: d,
            angle: sqrt(d)
        }
    })

    let fromArray = [], toArray = []
    data.link = example.link.map((d, i) => {
        let from = d.start, to = d.end,


            fromArrayEle = data.axisnode.findIndex((item) => {
                return item.tick == from
            })
        fromArray.push(fromArrayEle)

        toArrayEle = data.axisnode.findIndex((item) => {
            return item.tick == to
        })
        toArray.push(toArrayEle)

        return {
            uid: i,
            name: d.name,
            fromId: fromArray[i],
            toId: toArray[i],
            fromGrade: d.start,
            toGrade: d.end,
            delta: d.end - d.start
        }
    })

    return data;
}

console.log('dataOutput', dataOutput)

