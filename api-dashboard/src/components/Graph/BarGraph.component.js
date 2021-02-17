
import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const [W, H] = [700, 300];

function BarGraph({dataToPresent}) {
    const graph = useRef();
    const axis = useRef();
    
    const colorGradient = v =>  `rgb(34, 40, ${30 + v % 19})`;
    
    useEffect(() => {
        if (graph.current && dataToPresent) {
            const max = dataToPresent.reduce( (prev, current) => Math.max(prev,current), 0);
            const barUnit = H/(max + 2);
            const len = dataToPresent.length;
            
            const group = d3.select(graph.current);
            const update = group.selectAll("g").data(dataToPresent);
            const enter = update.enter().append("g");
            enter.append("rect");
            enter.append("text");
            const bars = update.merge(enter);

            bars
                .select("rect")
                .attr("x", (d, i) => i * (W / len))
                .attr("y", d => H - d * barUnit)
                .attr("width", W / len)
                .attr("height", d => d * barUnit)
                .attr("fill", d => colorGradient(d))
                .attr("transform", "translate(0, -30)");

            bars
                .select("text")
                .text(d => d)
                .attr("text-anchor", "middle")
                .attr("x", (d, i) => i * (W / len) + (W / len) / 2 )
                .attr("y", d => H - d * barUnit + 12 - 25)
                .style("font-size", 12)
                .style("fill", "#ffffff");

            const graphAxis = d3.select(axis.current);
            var scale = d3.scaleLinear().domain([1, 12]).range([0, W - 100]);
            var x_axis = d3.axisBottom().scale(scale);
            graphAxis.append('g').attr("transform", `translate(50,${H - 25})`).call(x_axis);

            update.exit().remove();
            graphAxis.exit().remove();
    }
    }, [dataToPresent]);
    

    return (
        <div style={{width: '100%'}}>
            <svg ref={axis} width={W} height={H}>
                <g ref={graph} />
            </svg>
        </div>
    );
}

export default BarGraph;