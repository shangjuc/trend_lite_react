import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import Plot from 'react-plotly.js';

function LineChart() {

    const [data, setData] = useState([]);
    const [layout, setLayout] = useState({});
    const [config, setConfig] = useState({});

    const days = 30;
    const lines = 1;
    const trace = {
        x: [],
        y: [],
        mode: "lines",
        line: {},
        type: "scatter",
        name: "社群影響力",
        hoverinfo: "label+name+y+x",
    };

    let show_fixed_line = true;
    let fixed_data = [];
    // show_fixed_line = false;

    let line_colors = ["#FFB11B", "#1b9aac", "lightblue", "purple"];
    let traces = [];

    function make_trace0() {
        traces = [];
        for (let i = 0; i <= lines; i++) {
            let trace_copy = JSON.parse(JSON.stringify(trace));

            for (let j = 0; j < days; j++) {
                let td = moment();
                trace_copy.x.push(td.subtract(j, "d").format("YYYY-MM-DD"));
                if (i === 0) {
                    trace_copy.y.push(0);
                } else {
                    let item = Math.floor(Math.random() * 500) / 1000;
                    // item = .5;
                    trace_copy.y.push(item);
                    fixed_data.push(item);
                };
            }
            traces.push(trace_copy);
        };
        make_fixed_line()
    }
    function make_trace1() {
        traces = [];
        for (let i = 0; i <= lines; i++) {
            let trace_copy = JSON.parse(JSON.stringify(trace));

            for (let j = 0; j < days; j++) {
                let td = moment();
                trace_copy.x.push(td.subtract(j, "d").format("YYYY-MM-DD"));
                if (i === 0) {
                    trace_copy.y.push(0);
                } else {
                    let item = Math.floor(Math.random() * 500) / 1000;
                    trace_copy.y.push(item);
                    fixed_data.push(item);
                };
            }
            traces.push(trace_copy);
        };
        make_fixed_line()
    }
    function make_fixed_line() {
        let fixed_num = Math.max(...fixed_data) / 2;
        // console.log(fixed_num)
        // console.log(traces[0].y)
        traces[0].name = "參考線";
        traces[0].line.dash = "5px 5px";
        traces[0].hoverinfo = "name+y";

        // traces[1].mode = 'lines+markers';

        for (let i = 0; i < traces[0].y.length; i++) {
            traces[0].y[i] = fixed_num;
        }

    }
    // make_trace1()

    let G = {};

    G.layout = {
        // width: 820, 
        height: 540,
        // hovermode: 'x',
        hovermode: "x unified",
        hoverlabel: {
            align: "right",
            bgcolor: "#FFF",
            namelength: 10,
        },
        showlegend: false,
        xaxis: {
            // gridwidth: 1,
            // autorange: true,
            tickformat: "%m/%d",
            fixedrange: true,
            // showline: true
            color: "#FFF",

        },
        yaxis: {
            fixedrange: true,
            autorange: true,
            // autorange: false,
            showticklabels: true,
            side: 'left',
            // domain: [0.5, 1],
            // range: [0,1],
            // dtick: .2
            color: "#FFF",

        },
        yaxis2: {
            // autorange: true,
            autorange: false,
            showticklabels: true,
            fixedrange: true,
            // domain: [0.5, 1],
            // range: [0,1],
            // dtick: .4,
            overlaying: 'y',
            side: 'right'

        },

        margin: {
            // l: 25,
            // r: 25,
        },
        font: {
            // size: get_font_size(),
        },
        legend: {
            x: 10,
            xanchor: "left",
            y: 1,
            yanchor: "bottom",
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
    };

    G.config = {
        responsive: true,
        showEditInChartStudio: true,
        displaylogo: false,
        displayModeBar: false,
    };
    make_trace0();

    const draw_chart = useCallback(
        () => {
            let temp_data = JSON.parse(JSON.stringify(traces));
            let colors = JSON.parse(JSON.stringify(line_colors));

            if (!show_fixed_line) {
                temp_data.splice(0, 1);
                colors.splice(0, 1);
            }

            // console.log(temp_data);

            temp_data.forEach((ele, idx) => {
                ele.line.color = colors[idx];
                ele.line.width = 4;
                if (idx === 2) {
                    ele.yaxis = 'y2';
                }
                // ele.line.dash = "0px 5200px";
                // ele.line.dash = "10px 10px";
            });
            let temp_layout = JSON.parse(JSON.stringify(G.layout));
            let temp_config = JSON.parse(JSON.stringify(G.config));
            temp_layout.yaxis.tickformat = ",.2f";
            temp_layout.yaxis2.tickformat = ",.2f";
            // layout.yaxis.range = [
            // Math.min(...fixed_data) * 1.5,
            // 0,
            // 	Math.max(...fixed_data) * 1.2,
            // ];


            setData(temp_data);
            setLayout(temp_layout);
            setConfig(temp_config);

            // Plotly.newPlot("lc_" + lc_id, data, layout, config).then(function () {
            //     chart_animate();
            // });

        }, []
    );


    useEffect(() => {
        draw_chart()
    }, [])

    return (
        <div className="chart-container">
            <Plot data={data} layout={layout} config={config} useResizeHandler className="w-full h-full" />
        </div>
    )
}

export default LineChart;