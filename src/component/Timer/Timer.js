import React from 'react';
import ReactDOM from 'react-dom';
import './Timer.scss';


class Clock2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    render(){
        return (
            <div className="container">
                <h1>Hello, {this.props.user}</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

function Clock(props) {
    return (
        <div className="container">
            <h1>Hello, {props.user}</h1>
            <h2>{props.date.toLocaleTimeString()}</h2>
        </div>
    )
}

function tick() {
    if (!document.getElementById('timer')){
        return;
    }
    ReactDOM.render(
        <Clock2 user={'SJC'} />, 
        document.getElementById('timer')
        );
}

function Timer() {
    setInterval(tick, 1000);

    return ( 
        <div id="timer"></div>
    );
}

export default Timer;
