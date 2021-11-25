import React, { useState, useEffect }  from 'react';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import { format } from 'date-fns'
import './Hotpost.scss';

function Hotpost(props) {
    
    const [rows_shown, setRowsShown] = useState([]);
    const [rows_full, setRowsFull] = useState([]);
    const [page_btns, setPageBtns] = useState([]);
    const HP = {};
    HP.max_per_page = 20;

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Hot Post`;
        console.log("HP")
        fetch_data();
    },[]); 

    
    function fetch_data(){
        fetch('http://localhost:3000/trendapi/api_analytics_hotpost')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let length = myJson.data[0].fb_raw.length;
            let rows = [];
            for(let i = 0; i < length; i++){
                let item = myJson.data[0].fb_raw[i];
                // console.log(item.ts)
                // rows.push(item)
                let time = format(item.ts, 'yyyy-MM-dd');
                rows.push(<TitleView key={i} hp_hash={i+1} hp_content={item.text} hp_ts={time} />)
            }
            return rows;            
        })
        .then(function(rows){
            // console.log(rows)
            setRowsFull(rows);
            count_pages(rows);
            pagination(1, rows);
            
        });
    }

    function count_pages(rows = rows_full, max_per_page = HP.max_per_page){
        let last_page = Math.floor(rows.length / max_per_page);
        console.log()
        let btns = [];
        for (let i = 0; i < last_page; i++) {
            btns.push(<PageButton key={i} click_page={click_page} page_num={i + 1} />)
        }
        setPageBtns(btns);
    }

    function pagination(page_num, rows = rows_full, max_per_page = HP.max_per_page){
        let new_rows = rows.slice((page_num - 1) * max_per_page, page_num * max_per_page)
        setRowsShown(new_rows);
        
    }

    function click_page(e){
        let page_num = Number(e.target.getAttribute("page_num"));
        pagination(page_num);
    }


    return (
        <div className="hotpost-container">
            {/* <button onClick={fetch_data}>Fetch</button> */}
            {/* <button onClick={click_page} page_num="1">1</button>
            <button onClick={click_page} page_num="2">2</button>
            <button onClick={click_page} page_num="3">3</button> */}
            {page_btns}

            <ul>
                <TitleView className="th" hp_hash="#" hp_content ="內文" hp_ts="時間" />
                {rows_shown}
            </ul>
        </div>
    )
}

function TitleView(props) {
    return (
        <li className="hp-li">
            <div className="hp-hash">{props.hp_hash}</div>
            <div className="hp-content">{props.hp_content}</div>
            <div className="hp-time">{props.hp_ts}</div>
        </li>
    )
}

function PageButton(props){
    return (
        <button className="page-button" onClick={props.click_page} page_num={props.page_num}>{props.page_num}</button>
    )
}


export default Hotpost;
