
import { useEffect } from 'react';
import * as d3 from 'd3';

function BarchartRace(props) {

    useEffect(() => {
        function getFetchUrl() {
            return "/csv/barchart_race_data.csv"
            // return "http://localhost:3000/trendapi/barchart_race_data.csv";
        }

        const container = `#barchart-basic${props.chart_idx}`;
        d3.csv(getFetchUrl()).then(function (data) {
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