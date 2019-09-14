import React from 'react';
import * as d3 from 'd3';

const Tooltip = () => {

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 16.6833)
        .attr("height", 20.3333)
        .attr("position", "relative")

    let info = d3.select('#mapboxgl-marker')
        .append('div')
        .attr('class', 'tooltip')
        .style('z-index', '1000')
        .style('position', 'absolute')
        .style('visibility', 'hidden')

    svg.selectAll('rect')

    return ( <
        div id = 'chart' >
        <
        /div>
    )
}