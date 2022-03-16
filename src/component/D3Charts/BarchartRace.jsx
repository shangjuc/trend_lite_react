
import { useEffect } from 'react';
import * as d3 from 'd3';

function BarchartRace(props) {

    useEffect(() => {


        const container = `#barchart-basic${props.chart_idx}`;
        d3.csv("http://localhost:3000/trendapi/barchart_race_data.csv").then(function (data) {
            d3.group(data, d => d.name);
            

        })
    });


    // render
    return (
        <div className="chart-container">
            <div id={`barchart-basic${props.chart_idx}`}>
                <svg></svg>
            </div>
        </div>
    )
}

export default BarchartRace;