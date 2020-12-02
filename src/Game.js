import React from 'react';
import Server from './Server';
import Client from './Client';

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
      servers: Array(this.props.servers).fill({ client: "", clientTime: -1 }),
      clientSeconds: getRandomExponential(this.props.lambda),
      lastClient: 0,
      clients: []
    };

    this.skins = ["#c58c85","#ecbcb4","#d1a3a4","#a1665e","#503335","#592f2a"];
    this.hairs = ["#76412a","#97502d","#d08736","#b87b36","#714628","#e6be8a","#5e321f","#ffcc47","#996515","#7c0a02","#5d1916","#121212","#310306","#59260b","#aa8866","#debe99","#241c11","#4f1a00","#9a3300"];
    this.pants = ["#7caac6","#84beeb","#425d8c","#313345","#1a224a"];
  }

  componentDidMount() {
    this.setTimers();
  }

  addNewClient() {
    let { clients, lastClient } = this.state;
    
    if (!this.props.limit || clients.length < this.props.limit) {
      clients.push({
        client: <Client
          gender={Math.round(Math.random())}
          skin={this.skins[parseInt(Math.random() * this.skins.length)]}
          hair={this.skins[parseInt(Math.random() * this.hairs.length)]}
          pants={this.skins[parseInt(Math.random() * this.pants.length)]}
          shoes="#aaa"
          shirt={`rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`}
        />,
        clientTime: getRandomPoisson(this.props.mu)
      });
    }

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
        server.client = "";
      }
      if (server.clientTime < -1 && clients.length) {
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
          {this.state.servers.map((server, index) => <Server key={index} client={server.client} />)}
        </div>
        <div className="clients">
          {this.state.clients.map((c, i) => <div className="client" key={i}>{c.client}</div>)}
        </div>
      </div>
    );
  }
}

export default Game;