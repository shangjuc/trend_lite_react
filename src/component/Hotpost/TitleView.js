import React from 'react';

function TitleView(props) {
    function toggle_card(e) {
        if (e.target.innerText === '#') {
            return;
        }
        e.target.parentNode.classList.toggle("open");
        // console.log(e.target)
    }
    // let time_format = format(props.hp_ts, 'yyyy MM dd');
    // let time3 = format(props.hp_ts, 'yyyy  MM月dd日');
    return (
        <li className={`hp-li ${props.hp_hash === '#'? 'th': ''}` } >
            <div className="hp-row">
                <div className={`hp-hash ${props.hp_hash === '#' ? 'th' : ''}`} onClick={toggle_card}>{props.hp_hash}</div>
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

export default TitleView;