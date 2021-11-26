import React from 'react';
import "./TitleView.scss";

function TitleView(props) {
    function toggle_card(e) {
        if (e.target.innerText === '#') {
            return;
        }
        e.target.parentNode.classList.toggle("open");
    }
    return (
        <li className={`hp-li ${props.hp_item.hash === '#'? 'th': ''}` } >
            <div className="hp-row">
                <div className={`hp-hash ${props.hp_item.hash === '#' ? 'th' : ''}`} onClick={toggle_card}>{props.hp_item.hash}</div>
                <div className="hp-pf">{props.hp_item.pf}</div>
                <div className="hp-content">{props.hp_item.content}</div>
                <div className="hp-time">{props.hp_item.time}</div>
            </div>
            <div className="hp-card">
                <h3>{props.hp_item.time2}</h3>
                {/* <h3>{props.hp_item.ts}</h3> */}
                <p>{props.hp_item.content}</p>

            </div>
        </li>
    )
}

export default TitleView;