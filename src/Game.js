import React from 'react';
import Server from './Server';

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function secondsToTime(seconds) {
  return [...Array(2).keys()].reduce((result, index) => {
    result.push(result[index] % Math.pow(60, 2-index));
    result[index] = Math.floor(result[index] / Math.pow(60, 2-index));
    return result;
  }, [seconds]).map(value => pad(value, 2)).join(":");
}

function getRandomExponential(rate) {
  return parseInt(-Math.log(Math.random()) / rate);
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      seconds: this.props.observe, 
      delta: 1,
      servers: [...Array(this.props.servers).keys()].map(key => <Server key={key} />) 
    };
  }

  componentDidMount() {
    this.setTimers();
  }

  setTimers() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.countDown(), this.state.delta * 1000);
  }

  countDown() {
    let seconds = parseInt(this.state.seconds - 1);

    if (seconds <= 0) { 
      clearInterval(this.timer);
      seconds = 0;
    }

    this.setState({ seconds: seconds });
  }

  multiplyDelta(factor) {
    this.setState({ delta: this.state.delta * factor }, () => this.setTimers());
  }

  render() {
    return (
      <div className="game">
        <div className="time-stats">
          <div className="time-counter">{secondsToTime(this.state.seconds)}</div>
          <div className="time-delta">
            <button className="modify-delta-button" disabled={this.state.delta >= 1} onClick={() => this.multiplyDelta(2)}>&lt;&lt;</button>
            <div>x{1/this.state.delta}</div>
            <button className="modify-delta-button" disabled={this.state.delta <= 1/32} onClick={() => this.multiplyDelta(1/2)}>&gt;&gt;</button>
          </div>
        </div>
        <div className="servers">
          {this.state.servers}
        </div>
      </div>
    );
  }
};
