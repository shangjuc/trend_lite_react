import React, { useState } from 'react';
import './Navbar.scss';


function NavDropButton(props) {

    const numbers = [1, 2, 3];
    const list_items = numbers.map((num, index) =>
        <li className="list-item" key={index} my_key={props.nav_value + num} onClick={click_btn}>{props.nav_value}{num}</li>
    )
    const [showList, setShowList] = useState(false)
    let show_list = false;
    
    function click_btn(e) {
        console.log(e.target.getAttribute('my_key'))
        // setShowList(true)
    }
    function click_drop_btn(){
        // console.log(showList)
        setShowList(!showList)
        // console.log(props.nav_value)
    }
    if (props.nav_index === props.nav_value) {
        show_list = true;
        // setShowList(true)
    } else {
        show_list = false;
        // setShowList(false)
    }

    return (
        <li className={'nav-btn unselectable ' + (showList ? "active" : "")}
            // onClick={props.click_navbtn}
            onClick={click_drop_btn}
            nav_value={props.nav_value}
            nav_index={props.nav_index}
        ><span nav_value={props.nav_value}>{props.nav_value}</span>
            <div className={'droplist '} hidden={showList ? false : true}>
                <ul>
                    {list_items}
                </ul>
            </div>
        </li>
    )
}


export default NavDropButton;