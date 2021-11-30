import { useState, useEffect }  from 'react';
import BarchartBasic from './BasicBarchart';
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
                <BarchartBasic chart_idx={chart_idx_arr[0]} color="#69b3a2"/>
                {/* <BarchartBasic chart_idx={chart_idx_arr[1]} color="red"/> */}
            </div>
        )
    } 
}



export default D3Charts;
