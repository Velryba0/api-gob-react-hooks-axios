import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import useAxios from './useAxios';


/* Component */
const MyD3Component = (props) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    console.log(props)

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (props.data && d3Container.current) {
                const svg = d3.select(d3Container.current);

                const margin = 80;
                const width = window.innerWidth - 2 * margin;
                const height = window.innerHeight - 2 * margin;


                // Bind D3 data
                const update = svg
                    .append('g')
                    .attr('transform', `translate(${margin}, ${margin})`)
                    // .data(props.data);

                // console.log(props.data)

                const xScale = d3.scaleBand()
                    .range([0, width])
                    .domain(props.data.map((s) => s._id))
                    .padding(0.4)

                const yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, 20]);

                const makeYLines = () => d3.axisLeft()
                    .scale(yScale)

                update.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale))
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.55em")
                    .attr("transform", "rotate(-90)");

                update.append('g')
                    .call(d3.axisLeft(yScale));

                update.append('g')
                    .attr('class', 'grid')
                    .call(makeYLines()
                        .tickSize(-width, 0, 0)
                        .tickFormat('')
                    )

                const barGroups = update.selectAll()
                    .data(props.data)
                    .enter()
                    .append('g')

                barGroups
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', (g) => xScale(g._id))
                    .attr('y', (g) => yScale(g.regular))
                    .attr('height', (g) => height - yScale(g.regular))
                    .attr('width', xScale.bandwidth())
                    .on('mouseenter', function(actual, i) {
                        console.log(actual)
                        console.log(i)
                        d3.selectAll('.value')
                            .attr('opacity', 0)

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr('opacity', 0.6)
                            .attr('x', (a) => xScale(a._id) - 5)
                            .attr('width', xScale.bandwidth() + 10)

                        const y = yScale(actual.regular)

                        update.append('line')
                            .attr('id', 'limit')
                            .attr('x1', 0)
                            .attr('y1', y)
                            .attr('x2', width)
                            .attr('y2', y)
                            .append('text')
                            .attr('fill', 'white')
                            .attr('text-anchor', 'middle')
                            .text('hhg')

                        // barGroups.append('text')
                        //     .attr('class', 'divergence')
                        //     .attr('x', (a) => xScale(a._id) + xScale.bandwidth() / 2)
                        //     .attr('y', (a) => yScale(a.regular) + 30)
                        //     .attr('fill', 'white')
                        //     .attr('text-anchor', 'middle')
                        //     .text('hhg')

                    })
                    .on('mouseleave', function() {
                        d3.selectAll('.value')
                            .attr('opacity', 1)

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr('opacity', 1)
                            .attr('x', (a) => xScale(a._id))
                            .attr('width', xScale.bandwidth())

                        update.selectAll('#limit').remove()
                        update.selectAll('.divergence').remove()
                    })

                // barGroups
                //     .append('text')
                //     .attr('class', 'value')
                //     .attr('x', (a) => xScale(a._id))
                //     .attr('y', (a) => yScale(a.regular) - 20)

                // .text((a) => `${a.regular}%`)

                svg
                    .append('text')
                    .attr('class', 'label')
                    .attr('x', -(height / 2) - margin)
                    .attr('y', margin / 2.4)
                    .attr('transform', 'rotate(-90)')
                    .attr('text-anchor', 'middle')
                    .text('Precio Gasolina (%)')

                svg.append('text')
                    .attr('class', 'label')
                    .attr('x', width / 2 + margin)
                    .attr('y', height + margin * 1.7)
                    .attr('text-anchor', 'middle')
                    .text('Establecimientos')

                svg.append('text')
                    .attr('class', 'title')
                    .attr('x', width / 2 + margin)
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .text('Precio Gasolina, 2019')

                svg.append('text')
                    .attr('class', 'source')
                    .attr('x', width - margin / 2)
                    .attr('y', height + margin * 1.7)
                    .attr('text-anchor', 'start')
                    .text('Fuente: API GOB México')





            }
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])

    return ( <
        svg className = "d3-component"
        width = { window.innerWidth }
        height = { window.innerHeight }
        ref = { d3Container }
        />
    );
}

export default MyD3Component;