import React, { useState, useEffect }  from 'react';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import { format } from 'date-fns'
import './Hotpost.scss';
import PageButton from './PageBtn';

function Hotpost(props) {
    
    const [rows_shown, setRowsShown] = useState([]);
    const [rows_full, setRowsFull] = useState([]);
    const [error, setError] = useState();
    const [page_btns, setPageBtns] = useState([]);
    let HP = { max_per_page: 10};

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Hot Post`;
        console.log("HP")
        fetch_data();        
    }, []);

    
    const fetch_data = async() =>{       
        try {
            // const resp = await fetch('http://localhost:3000/trendapi/api_analytics_hotpost').then(r => r.json());
            const rows = await fetch('http://localhost:3000/trendapi/api_analytics_hotpost')
            .then(r => r.json())
            .then(function (myJson) {
                let length = myJson.data[0].fb_raw.length;
                let rows = [];
                for(let i = 0; i < length; i++){
                    let item = myJson.data[0].fb_raw[i];
                    let time = format(item.ts, 'yyyy-MM-dd');
                    let time2 = format(item.ts, 'yyyy年MM月dd日');
                    rows.push(<TitleView key={i} hp_hash={i+1} hp_content={item.text} hp_time={time} hp_time2={time2} hp_ts={item.ts}/>)
                }
                return rows;            
            })
            setRowsFull(rows);
            count_pages(rows);
            pagination(1, rows);

            // setData(resp);
        } catch (e) {
            setError(e);
        }

    }

    function count_pages(rows = rows_full, max_per_page = HP.max_per_page){
        let last_page = Math.floor(rows.length / max_per_page);
        // console.log(rows)
        let btn_arr = [];
        let btns = [];
        for (let i = 0; i < last_page; i++) {
            btns.push(<PageButton key={i} click_page={click_page} page_num={i + 1} />)
            btn_arr.push(i+1);
        }
        // setPageBtns(btns);
        setPageBtns(btn_arr);
    }

    const pagination = (page_num, rows = rows_full, max_per_page = HP.max_per_page) => {
        // console.log(rows)
        let new_rows = rows.slice((page_num - 1) * max_per_page, page_num * max_per_page)
        setRowsShown(new_rows);
        
    }

    const click_page = (e) =>{
        let page_num = Number(e.target.getAttribute("page_num"));
        pagination(page_num, rows_full);
    }

    if(rows_full.length > 0){
        
        return (
            <div className="hotpost-container">

                <div className="page-btn-container">
                    {/* <button onClick={fetch_data}>Fetch</button> */}
                    {/* <button onClick={click_page} page_num="1">1</button>
                    <button onClick={click_page} page_num="2">2</button>
                    <button onClick={click_page} page_num="3">3</button> */}
                    {/* <PageButton click_page={click_page} page_num={5} />
                    <PageButton click_page={click_page} page_num={3} />
                    <PageButton click_page={click_page} page_num={1} /> */}
                    {/* {page_btns} */}
                    {page_btns.map(i => <PageButton key={i} click_page = { click_page } page_num = {i} />)}
                </div>
    
                <ul>
                    <TitleView className="th" hp_hash="#" hp_content ="內文" hp_time="時間" hp_ts="" />
                    {rows_shown}
                </ul>
            </div>
        )
    } else if (error){
        return(
            <div className="hotpost-container">
                Error!
            </div>
        )

    
    } else {
        return(
            <div className="hotpost-container">
                Loading...
            </div>
        )
    }
}

function TitleView(props) {
    function toggle_card(e){
        if(e.target.innerText === '#'){
            return;
        }
        e.target.parentNode.classList.toggle("open");
        console.log(e.target)
    }
    // let time_format = format(props.hp_ts, 'yyyy MM dd');
    // let time3 = format(props.hp_ts, 'yyyy  MM月dd日');
    return (
        <li className="hp-li">
            <div className="hp-row">
                <div className="hp-hash" onClick={toggle_card}>{props.hp_hash}</div>
                <div className="hp-content">{props.hp_content}</div>
                <div className="hp-time">{props.hp_time}</div>
            </div>
            <div className="hp-card">
                <h3>{props.hp_time2}</h3>
                {/* <h3>{props.hp_ts}</h3> */}
                <p>{props.hp_content}</p>
                
            </div>
        </li>
    )
}


export default Hotpost;
