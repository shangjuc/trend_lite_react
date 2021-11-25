import React, { useState, useEffect }  from 'react';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import { format, set } from 'date-fns'
import './Hotpost.scss';

function Hotpost(props) {
    
    const [post_rows, setRows] = useState([]);
    const [real_rows, setRR] = useState([]);

    // let post_rows = [];
    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Hot Post`;
        console.log("HP")
        fetch_data()
    },[]);
    function fetch_data(){
        fetch('http://localhost:3000/trendapi/api_analytics_hotpost')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            // console.log(myJson);
            let length = myJson.data[0].fb_raw.length;
            // length = 10;
            let rows = [];
            for(let i = 0; i < length; i++){
                let item = myJson.data[0].fb_raw[i];
                // console.log(item.ts)
                // rows.push(item)
                let time = format(item.ts, 'yyyy-MM-dd');
                rows.push(<HP_titleview key={i} hp_hash={i+1} hp_content={item.text} hp_ts={time}></HP_titleview>)
            }
            return rows;            
        })
        .then(function(rows){
            console.log(rows)
            setRR(rows);
            pagination(1, rows);
        });
    }


    function pagination(page_num, rows){
        if(rows === undefined){
            rows = real_rows;
        }
        let max_per_page = 10;
        let new_rows = rows.slice((page_num - 1) * max_per_page, page_num * max_per_page)
        setRows(new_rows)

    }

    function click_page(e){
        let page_num = Number(e.target.getAttribute("page_num"));
        pagination(page_num);
    }
    

    return (
        <div className="hotpost-container">
            <button onClick={fetch_data}>Fetch</button>
            <button onClick={click_page} page_num="1">1</button>
            <button onClick={click_page} page_num="2">2</button>
            <button onClick={click_page} page_num="3">3</button>

            <ul>
                <HP_titleview className="th" hp_hash="#" hp_content ="內文" hp_ts="時間" />
                {post_rows}
            </ul>
        </div>
    )
}

function HP_titleview(props) {
    return (
        <li className="hp-li">
            <div className="hp-hash">{props.hp_hash}</div>
            <div className="hp-content">{props.hp_content}</div>
            <div className="hp-time">{props.hp_ts}</div>

        </li>
    )

}


export default Hotpost;
