import React from 'react';
import "./PageBtn.scss";

function PageButton(props) {
    return (
        <button className="page-button" onClick={props.click_page} page_num={props.page_num}>{props.page_num}</button>
    )
}

export default PageButton;