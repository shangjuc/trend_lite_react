import React from 'react';
import "./PageBtn.scss";

function PfButton(props) {
    return (
        <button className="pf-button" onClick={props.click_pf} pf={props.pf}>{props.pf}</button>
    )
}

export default PfButton;