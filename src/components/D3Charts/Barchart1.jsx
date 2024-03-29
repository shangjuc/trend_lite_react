
import { useEffect, useState } from 'react';
import * as d3 from 'd3v6';
import Papa from 'papaparse';

function Barchart1(props) {
    
    const [net_status, setNetStatus] = useState(0);
    const query = "";
    useEffect(() => {

        function getFetchUrl() {
            return "/csv/barchart_basic_data.csv"
            // return "http://localhost:3000/trendapi/barchart_basic_data.csv";
        }

        async function fetch_data() {
            
            setNetStatus(1);
            try {
                await fetch(getFetchUrl())
                    .then(r => {
                        console.log(r);
                        // console.log(r.text());

                        return r.text()
                    })
                    .then(v=>
                        Papa.parse(v)
                    )
                    .then(function (resp) {
                        setNetStatus(200);
                        console.log(resp)
                        // set the dimensions and margins of the graph
                        const margin = { top: 10, right: 30, bottom: 30, left: 40 },
                            width = 960 - margin.left - margin.right,
                            height = 400 - margin.top - margin.bottom;

                        // append the svg object to the body of the page
                        d3.select(`#barchart-basic${props.chart_idx} svg`).remove();

                        const svg = d3.select(`#barchart-basic${props.chart_idx}`)
                            .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform",
                                `translate(${margin.left},${margin.top})`);

                        // get the data
                        
                        d3.csv(getFetchUrl()).then(function (data) {

                            // X axis: scale and draw:
                            const x = d3.scaleLinear()
                                .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
                                // .domain([0, d3.max(data, function (d) { return +d.price })])    
                                .range([0, width]);
                            svg.append("g")
                                .attr("transform", `translate(0, ${height})`)
                                .call(d3.axisBottom(x));

                            // set the parameters for the histogram
                            const histogram = d3.histogram()
                                .value(function (d) { return d.price; })   // I need to give the vector of value
                                .domain(x.domain())  // then the domain of the graphic
                                .thresholds(x.ticks(70)); // then the numbers of bins

                            // And apply this function to data to get the bins
                            const bins = histogram(data);

                            // Y axis: scale and draw:
                            const y = d3.scaleLinear()
                                .range([height, 0]);
                            y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
                            svg.append("g")
                                .call(d3.axisLeft(y));

                            // append the bar rectangles to the svg element
                            svg.selectAll("rect")
                                .data(bins)
                                .join("rect")
                                .attr("x", 1)
                                .attr("transform", function (d) { return `translate(${x(d.x0)} , ${y(d.length)})` })
                                // .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1})
                                .attr("width", function (d) { return (x(d.x1) - x(d.x0)) * .8 })
                                .attr("height", function (d) { return height - y(d.length); })
                                .style("fill", props.color)

                        });

                        
                    })

            } catch (err){
                console.log("Error", err)
                setNetStatus(400);
            }

            

        }
        fetch_data()
    }, [query, props.color, props.chart_idx]);

    // render
    if (net_status === 200) {
        return (
            <div className="chart-container">
                <div id={`barchart-basic${props.chart_idx}`}>
                    <svg></svg>
                </div>
            </div>
        )
    } else if (net_status === 400){
        return (
            <div className="chart-container">
                <div className="error">
                    Error! Status 404;
                </div>
            </div>
        )
    } else {
        
        return (
            <div className="chart-container">
                <div className="loading">
                    Loading D3 Charts...
                </div>
            </div>
        )
    }
}

export default Barchart1;