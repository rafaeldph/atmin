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
  return parseInt(-Math.log(Math.random()) * rate);
}

function getRandomPoisson(lambda) {
  let l = Math.exp(-lambda);
  let p = 1.0;
  let k = 0;

  do {
    k++;
    p *= Math.random();
  } while (p > l);

  return parseInt(k - 1);
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      seconds: this.props.observe, 
      delta: 1,
      servers: Array(this.props.servers).fill({ clientColor: "", clientTime: -3 }),
      clientSeconds: getRandomExponential(this.props.lambda),
      lastClient: 0,
      clients: []
    };
  }

  componentDidMount() {
    this.setTimers();
  }

  addNewClient() {
    let { clients, lastClient } = this.state;
    
    clients.push({
      clientColor: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`,
      clientTime: getRandomPoisson(this.props.mu)
    });

    this.setState({ clients: clients, lastClient: parseInt(lastClient + 1), clientSeconds: getRandomExponential(this.props.lambda) });
  }

  setTimers() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let { seconds, clientSeconds } = this.state;

      if (parseInt(seconds - 1) <= 0) { 
        clearInterval(this.timer);
        seconds = 1;
      }

      this.setState({ seconds: parseInt(seconds - 1) });

      if (parseInt(clientSeconds - 1) <= 0) {
        this.addNewClient();
      } else {
        this.setState({ clientSeconds: parseInt(clientSeconds - 1) });
      }

      this.checkServers();
    }, this.state.delta * 1000);
  }

  checkServers() {
    let { servers, clients } = this.state;

    servers = servers.map(server => {
      server.clientTime -= 1;
      
      if (server.clientTime < 0) {
        server.clientColor = "";
      }
      if (server.clientTime < -3 && clients.length) {
        server = clients.shift();
      }

      return server;
    });

    this.setState({ servers: servers, clients: clients });
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
          {this.state.servers.map((server, index) => <Server key={index} clientColor={server.clientColor} />)}
        </div>
      </div>
    );
  }
}

export default Game;