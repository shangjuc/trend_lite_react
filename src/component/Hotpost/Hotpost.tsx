import React, { useState, useEffect, useCallback }  from 'react';
import { format } from 'date-fns'
// import { moment } from 'moment';
import './Hotpost.scss';
import PageButton from './PageBtn.jsx';
import TitleView from './TitleView.jsx';
import PfButton from './PFBtn';

function Hotpost(props) {
    
    const [data_full_FB, setDataFull_FB] = useState([]);
    const [data_full_FORUM, setDataFull_FORUM] = useState([]);
    const [page_btns, setPageBtns] = useState([]);
    const [pf_btns, setPfBtns] = useState(['FB', 'FORUM']);
    const [pf, setPF] = useState("");
    const [data_shown, setDataShown] = useState([]);
    // const [max_per_page, setMaxPerPage] = useState(10);
    const max_per_page = 10;
    // const [query, setQuery] = useState("");
    const query= "";
    const [net_status, setNetStatus] = useState(0);

    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        document.title = `Hot Post`;
    });

    const count_pages = useCallback(
        (data) => {
            let last_page = Math.floor(data.length / max_per_page);
            let btn_arr:any = [];
            for (let i = 0; i < last_page; i++) {
                btn_arr.push(i + 1);
            }
            setPageBtns(btn_arr);
        },
        [max_per_page],
    );

    // function count_pages(data) {
    //     let last_page = Math.floor(data.length / max_per_page);
    //     let btn_arr = [];
    //     for (let i = 0; i < last_page; i++) {
    //         btn_arr.push(i + 1);
    //     }
    //     setPageBtns(btn_arr);
    // }

    const do_pagination = useCallback(
        (page_num, data) => {
            let new_rows = data.slice((page_num - 1) * max_per_page, page_num * max_per_page)
            setDataShown(new_rows);
        },
        [max_per_page],
    );


    // function do_pagination(page_num, data) {
    //     let new_rows = data.slice((page_num - 1) * max_per_page, page_num * max_per_page)
    //     setDataShown(new_rows);
    // }

    useEffect(() => {
        function getFetchUrl() {
            return '/json/hotpost.json'
            return 'http://localhost:3000/trendapi/api_analytics_hotposts?query=' + query;

        }

        async function fetch_data() {
            try {
                const data = await fetch(getFetchUrl())
                    .then(r => r.json())
                    .then(function (resp) {
                        let arr = [];
                        
                        if ("forum_raw" in resp.data[0]) {
                            let raw = resp.data[0]["forum_raw"];
                            let temp_arr:any = [];
                            for (let i = 0; i < raw.length; i++) {
                                let item = raw[i];
                                item.pf = "FORUM";
                                item.hash = i + 1;
                                item.time = format(item.ts, 'yyyy-MM-dd HH:mm');
                                item.time2 = format(item.ts, 'yyyy年MM月dd日 HH:mm');
                                temp_arr.push(item);
                            }
                            setDataFull_FORUM(temp_arr);
                            setPF("FORUM")
                            arr = temp_arr;
                        }
                        if ("fb_raw" in resp.data[0]) {
                            let raw = resp.data[0]["fb_raw"];
                            let temp_arr:any = [];
                            for (let i = 0; i < raw.length; i++) {
                                let item = raw[i];
                                item.pf = "FB";
                                item.hash = i + 1;
                                item.time = format(item.ts, 'yyyy-MM-dd HH:mm');
                                item.time2 = format(item.ts, 'yyyy年MM月dd日 HH:mm');
                                item.content = item.text;
                                temp_arr.push(item);
                            }
                            setDataFull_FB(temp_arr);
                            setPF("FB")
                            arr = temp_arr;
                        }
                        return arr;
                    });
                setNetStatus(200);
                count_pages(data);
                do_pagination(1, data);

            } catch(err) {
                setNetStatus(400);
                console.log(err)
            }

        }
        
        fetch_data();        

    }, [query, count_pages, do_pagination]);



    const click_page = (e) =>{
        let page_num = Number(e.target.getAttribute("page_num"));
        if (pf === "FB") {
            do_pagination(page_num, data_full_FB);
        } else if (pf === 'FORUM'){
            do_pagination(page_num, data_full_FORUM);
        }

    }

    const click_pf = (e: { target: { getAttribute: (arg0: string) => any; }; }) => {
        let pf:string = String(e.target.getAttribute("pf"));
        setPF(pf);
        if(pf === "FB"){
            count_pages(data_full_FB)
            do_pagination(1, data_full_FB);
        }else if(pf === "FORUM"){
            count_pages(data_full_FORUM)
            do_pagination(1, data_full_FORUM);
        }
    }

    // render
    
        return(
       
        <div className="hotpost-container">
            { net_status === 200 &&
                <>
                    <div className="page-btn-container">
                        {pf_btns.map(pf=>
                        <PfButton key={pf} click_pf={click_pf} pf={pf}/>)}
                        {/* <button onClick={click_pf} pf="FB">FB</button>
                        <button onClick={click_pf} pf="FORUM">FORUM</button> */}
                    </div>
                    <div className="page-btn-container">
                        {page_btns.map(item => 
                        <PageButton key={item} click_page = { click_page } page_num = {item} />)}
                    </div>
                    <ul>
                        <TitleView hp_item={{hash:"#",pf:"渠道",content:"內容",time:'時間'}}
                        />
                        {data_shown.map((item:any, i) => 
                        <TitleView key={item.hash} hp_item={item} />)
                        }
                    </ul>
                </>
            }
            { net_status !== 200 && 
                <span>{ net_status === 400 ? 'Error!' : 'Loading Hotposts...'}</span>
            }
                
        </div>
            
        
        )   
    
}


export default Hotpost;
