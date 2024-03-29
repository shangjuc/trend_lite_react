import  { useEffect  }  from 'react';
import Plot from 'react-plotly.js';
import LineChart from './Linechart.jsx';
import './PlotlyCharts.scss';

function PlotlyCharts(props) {
    
    // const [data, setData] = useState([]);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Plotly Charts`;
    });



    // render
    if (true){
        return (
            <div>
                {/* <PlotlyBasic/> */}
                <LineChart/>
            </div>
        )
    } 
}

function PlotlyBasic(){

    const data = [
        {
            x: [1, 2, 3],
            y: [20, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
    ];
    const layout = { width: 520, height: 540, title: 'A Fancy Plot' };
    return (
        <div className="chart-container">
            <Plot data={data} layout={layout} />
        </div>
    )
}

export default PlotlyCharts;
