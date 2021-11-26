import React, { useState, useEffect }  from 'react';
import { format } from 'date-fns'
// import { moment } from 'moment';
import './Hotpost.scss';
import PageButton from './PageBtn';
import TitleView from './TitleView';

function Hotpost(props) {
    
    const HP = { max_per_page: 10};
    const [data_full, setDataFull] = useState([]);
    const [page_btns, setPageBtns] = useState([]);
    const [data_shown, setDataShown] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Hot Post`;
        console.log("HP");
        fetch_data();        
    }, []);

    
    const fetch_data = async() =>{       
        try {
            const data = await fetch('http://localhost:3000/trendapi/api_analytics_hotpost')
            .then(r => r.json())
            .then(function (resp) {
                let length = resp.data[0].fb_raw.length;
                let arr = [];
                for(let i = 0; i < length; i++){
                    let item = resp.data[0].fb_raw[i];                    
                    item.hash = i+1;
                    item.time = format(item.ts,'yyyy-MM-dd HH:mm');
                    item.time2 = format(item.ts,'yyyy年MM月dd日 HH:mm');
                    // item.time = moment(item.ts).format('YYYY-MM-DD');
                    // item.time2 = moment(item.ts).format('YYYY年MM月DD日');
                    arr.push(item);
                }
                // console.log(arr)
                return arr;            
            })
            setDataFull(data);
            count_pages(data);
            do_pagination(1, data);

            // setData(resp);
        } catch (e) {
            setError(e);
        }

    }

    const count_pages = (rows = data_full, max_per_page = HP.max_per_page) => {
        let last_page = Math.floor(rows.length / max_per_page);
        let btn_arr = [];
        for (let i = 0; i < last_page; i++) {
            btn_arr.push(i+1);
        }
        setPageBtns(btn_arr);
    }

    const do_pagination = (page_num, rows = data_full, max_per_page = HP.max_per_page) => {
        let new_rows = rows.slice((page_num - 1) * max_per_page, page_num * max_per_page)
        setDataShown(new_rows);
    }

    const click_page = (e) =>{
        let page_num = Number(e.target.getAttribute("page_num"));
        do_pagination(page_num, data_full);
    }

    if(data_full.length > 0){
        
        return (
            <div className="hotpost-container">

                <div className="page-btn-container">
                    {page_btns.map(item => 
                    <PageButton key={item} click_page = { click_page } page_num = {item} />)}
                </div>
    
                <ul>
                    <TitleView className="th" hp_hash="#" hp_content ="內文" hp_time="時間" hp_ts="" />
                    {data_shown.map((item, i) => 
                    <TitleView key={item.hash} hp_hash={item.hash} hp_content={item.text} hp_time={item.time} hp_time2={item.time2} hp_ts={item.ts} />)}
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


export default Hotpost;
