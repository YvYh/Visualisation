const data = [40, 25, 10, 15, 5, 10];

const height = 600;
const width = 800;

const inner = 50;
const outer = 120;

const nbData = data.length;

let svg =d3.select('body')
    .append('svg')
    .attr('width',width)
    .attr('height',height);

let g = svg
    .append('g')
        .attr('transform',`translate(${width/2},${height/2})`);

let centre = g.append('circle')
    .attr('cx',0)
    .attr('cy',0)
    .attr('r',5);

let couleurs = [];
let couleurs2 = [];
let delta = 360/nbData;
for(let i=0; i<nbData; i++)
{
    couleurs.push(d3.hsl(delta*i, 0.5, 0.6));
    couleurs2.push(d3.hsl(delta*i, 0.9, 0.6));
}

let donut = function(tableau){
    const sum = d3.sum(tableau);
    const nb = tableau.length;
    let dataAngle = [];
    let angle = 0;
    for (let i=0; i<nb; i++){
        dataAngle.push(angle);
        angle += tableau[i]*360/sum;
    }
    dataAngle.push(angle);
    
    let secteurs = g.selectAll('path')
        .data(tableau);
    
    secteurs.enter()
        .append('path')
        .attr('d',function(d,i){
            let arc =d3.arc()
                .innerRadius(innner)
                .outerRadius(outer)
                .startAngle(0)
                .endAngle(Math.PI*2);
        return arc();
    })
    .attr('fill', function(d, i){
        return couleurs[i];
    })
    .on('mouseover', function(d,i){
        d3.select(this)
            .attr('fill',couleurs2[i]);
        })
    .on('mouseout', function(d,i){
        d3.select(this)
            .attr('fill',couleurs[i]);
        })
    .on('click',function(d,i){
        tableau.splice(i,1);
        couleurs.splice(i,1);
        couleurs2.splice(i,1);
        dount(tableau);
    })
    .transition()
    .duration(2000)
    .attr('transform', function(d,i){
        return `rotate(${dataAngle[i]})`
    })

    secteurs.
    secteurs.exit().remove();
        
}