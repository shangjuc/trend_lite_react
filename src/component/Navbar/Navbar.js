import React, { useState } from 'react';
// import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './Navbar.scss';

// class Navbar extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             nav_index: '',
//         };
//         this.click_navbtn = this.click_navbtn.bind(this);
//     }
    
//     click_navbtn(e){
//         if (this.state.nav_index !== e.target.getAttribute("nav_value")){
//             this.setState({ nav_index: e.target.getAttribute("nav_value")});
//         } else {
//             this.setState({nav_index: ''});
//         }
//     } 
//     nav_btn_arr = ['E', 'F', 'G'];
//     nav_btn_arr2 = ['H', 'I', 'J'];
   
//     render(){
//         const nav_btn_arr = this.nav_btn_arr;
//         const nav_btn_arr2 = this.nav_btn_arr2;
//         var btn_rows = [];
//         for(let i = 0; i<nav_btn_arr2.length; i++){
//             btn_rows.push(<NavButton key={nav_btn_arr2[i]} nav_value={nav_btn_arr2[i]} click_navbtn={this.click_navbtn} nav_index={this.state.nav_index} />)
//         }
//         return (
//             <div id="navbar_new">
//                 <img className="App-logo" src={logo} alt="logo"></img>
//                 <ul nav_index={this.state.nav_index}>
//                     <NavButton nav_value='A' click_navbtn={this.click_navbtn} nav_index={this.state.nav_index}/>
//                     <NavButton nav_value='B' click_navbtn={this.click_navbtn} nav_index={this.state.nav_index}/>
//                     <NavButton nav_value='C' click_navbtn={this.click_navbtn} nav_index={this.state.nav_index}/>
                    
//                     {nav_btn_arr.map((value) => 
//                     <NavButton key={value} nav_value={value} click_navbtn={this.click_navbtn} nav_index={this.state.nav_index} />)}
//                     {btn_rows}
//                 </ul>
//                 <input type="file"></input>
//             </div>
//         );
//     }
// }
function Navbar(props) {
    const [nav_index, setNavIdx] = useState('');
    
    function click_navbtn(e){
        if (nav_index !== e.target.getAttribute("nav_value")){
            setNavIdx(e.target.getAttribute("nav_value"));
        } else {
            setNavIdx('');
        }
    } 
    const nav_btn_arr = ['Timer', 'HotPost'];
    const nav_btn_arr2 = ['H', 'I', 'J'];
   
    // const nav_btn_arr = nav_btn_arr;
    // const nav_btn_arr2 = nav_btn_arr2;
    var btn_rows = [];
    for(let i = 0; i<nav_btn_arr2.length; i++){
        btn_rows.push(<NavButton key={nav_btn_arr2[i]} nav_value={nav_btn_arr2[i]} click_navbtn={click_navbtn} nav_index={nav_index} />)
    }
    return (
        <div id="navbar">
            <img className="App-logo" src={logo} alt="logo"></img>
            <ul nav_index={nav_index}>
                {/* <NavButton nav_value='A' click_navbtn={click_navbtn} nav_index={nav_index}/>
                <NavButton nav_value='B' click_navbtn={click_navbtn} nav_index={nav_index}/>
                <NavButton nav_value='C' click_navbtn={click_navbtn} nav_index={nav_index}/> */}
                
                {nav_btn_arr.map(val => 
                <NavButton key={val} nav_value={val} click_navbtn={click_navbtn} nav_index={nav_index} />)}

                {btn_rows}
            </ul>
            {/* <input type="file"></input> */}
        </div>
    );
}

function NavButton(props){

    const numbers = [1, 2, 3];
    const list_items = numbers.map((num, index) =>
        <li key={index} my_key={props.nav_value + num} onClick={click_btn}>{props.nav_value}{num}</li>
    )
    let show_list = false;
    function click_btn(e){
        console.log(e.target.getAttribute('my_key'))
    }
    if (props.nav_index === props.nav_value) {
        show_list = true;
    } else {
        show_list = false;
    }

    return (
        <li className={'tab_btn unselectable ' + (show_list ? "active" : "")}
            onClick={props.click_navbtn}
            nav_value={props.nav_value}
            nav_index={props.nav_index}
        >{props.nav_value}
            <div className={'droplist '} hidden={show_list ? false : true}>
                <ul>
                    {list_items}
                </ul>
            </div>
        </li>
    )
}

// class NavButton extends React.Component{
//     constructor(props) {
//         super(props)
//     }

//     numbers = [1, 2, 3];
//     list_items = this.numbers.map((num, index) =>
//         <li key={index}>{this.props.nav_value}{num}</li>
//     )

//     render() {
//         let show_list = false;
//         if (this.props.nav_index === this.props.nav_value) {
//             show_list = true;
//         } else {
//             show_list = false;
//         }

//         return (
//             <li className={'tab_btn unselectable ' + (show_list ? "active" : "")}
//                 onClick={this.props.click_navbtn}
//                 nav_value={this.props.nav_value}
//                 nav_index={this.props.nav_index}
//             >{this.props.nav_value}
//                 <div className={'droplist '} hidden={show_list ? false : true}>
//                     <ul>
//                         {this.list_items}
//                     </ul>
//                 </div>
//             </li>
//         )
//     }
// }
export default Navbar;
