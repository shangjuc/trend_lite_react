import React, { useState, useEffect }  from 'react';
import { format } from 'date-fns'
// import { moment } from 'moment';
import './Hotpost.scss';
import PageButton from './PageBtn';
import TitleView from './TitleView';

function Hotpost(props) {
    
    const HP = { 
        max_per_page: 10,
        FB:{},
        FORUM:{}
    };
    const [data_full_FB, setDataFull_FB] = useState([]);
    const [data_full_FORUM, setDataFull_FORUM] = useState([]);
    const [page_btns, setPageBtns] = useState([]);
    const [pf, setPF] = useState("");
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
                let arr = [];
                if("fb_raw" in resp.data[0]){
                    let raw = resp.data[0]["fb_raw"];
                    HP.FB.arr = [];
                    for(let i = 0; i < raw.length; i++){
                        let item = raw[i];
                        item.pf = "FB";
                        item.hash = i+1;
                        item.time = format(item.ts,'yyyy-MM-dd HH:mm');
                        item.time2 = format(item.ts,'yyyy年MM月dd日 HH:mm');
                        item.content = item.text;
                        HP.FB.arr.push(item);
                    }
                    setDataFull_FB(HP.FB.arr);
                    setPF("FB")
                    arr = HP.FB.arr;
                }
                if("forum_raw" in resp.data[0]){
                    let raw = resp.data[0]["forum_raw"];
                    HP.FORUM.arr = [];
                    for(let i = 0; i < raw.length; i++){
                        let item = raw[i];      
                        item.pf = "FORUM";              
                        item.hash = i+1;
                        item.time = format(item.ts,'yyyy-MM-dd HH:mm');
                        item.time2 = format(item.ts,'yyyy年MM月dd日 HH:mm');
                        HP.FORUM.arr.push(item);
                    }
                    setDataFull_FORUM(HP.FORUM.arr);
                    setPF("FORUM")
                    arr = HP.FORUM.arr;
                }

                return arr;
            })
            count_pages(data);
            do_pagination(1, data);

            // setData(resp);
        } catch (e) {
            setError(e);
        }

    }

    const count_pages = (rows, max_per_page = HP.max_per_page) => {
        let last_page = Math.floor(rows.length / max_per_page);
        let btn_arr = [];
        for (let i = 0; i < last_page; i++) {
            btn_arr.push(i+1);
        }
        setPageBtns(btn_arr);
    }

    const do_pagination = (page_num, rows, max_per_page = HP.max_per_page) => {
        let new_rows = rows.slice((page_num - 1) * max_per_page, page_num * max_per_page)
        setDataShown(new_rows);
    }

    const click_page = (e) =>{
        let page_num = Number(e.target.getAttribute("page_num"));
        if (pf === "FB") {
            do_pagination(page_num, data_full_FB);
        } else if (pf === 'FORUM'){
            do_pagination(page_num, data_full_FORUM);
        }

    }

    const click_pf = (e) => {
        let pf = String(e.target.getAttribute("pf"));
        // console.log(pf)
        setPF(pf);
        if(pf === "FB"){
            count_pages(data_full_FB)
            do_pagination(1, data_full_FB);
        }else if(pf === "FORUM"){
            count_pages(data_full_FORUM)
            do_pagination(1, data_full_FORUM);
        }
    }

    if(data_full_FB.length > 0){
        
        return (
            <div className="hotpost-container">

                <div className="page-btn-container">
                    <button onClick={click_pf} pf="FB">FB</button>
                    <button onClick={click_pf} pf="FORUM">FORUM</button>
                </div>
    
                <div className="page-btn-container">
                    {page_btns.map(item => 
                    <PageButton key={item} click_page = { click_page } page_num = {item} />)}
                </div>
    
                <ul>
                    <TitleView hp_item={{hash:"#",pf:"渠道",content:"內容",time:'時間'}}
                    />
                    {data_shown.map((item, i) => 
                    <TitleView key={item.hash} hp_item={item} />)
                    }
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
