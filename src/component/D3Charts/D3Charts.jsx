import { useState, useEffect }  from 'react';
import Barchart1 from './Barchart1.jsx';
import Barchart2 from './Barchart2.jsx';
import BarchartRace from './BarchartRace.jsx';
import './D3Charts.scss';

function D3Charts(props) {
    
    // const [data, setData] = useState([]);
    const [chart_idx_arr, setChartIdxArr] = useState([1,2,3]);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `D3 Charts`;
    });

    // render
    if (true){
        return (
            <div>
                <Barchart1 chart_idx={chart_idx_arr[0]} color="#69b3a2"/>
                {/* <Barchart2 chart_idx={chart_idx_arr[1]}/> */}
                {/* <BarchartRace chart_idx={chart_idx_arr[2]}/> */}
            </div>
        )
    } 
}



export default D3Charts;
