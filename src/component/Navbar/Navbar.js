import React, { useState } from 'react';
import logo from './logo.svg';
import './Navbar.scss';
import NavButton from './NavButton';

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

export default Navbar;
