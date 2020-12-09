import React from 'react';
import secondsToTime from './time';

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function probabilityToPercentage(probability, precission) {
  return `${Math.round(probability * Math.pow(10, precission)) / Math.pow(10, precission)}%`;
}

function formatNumber(number, precission) {
  return Math.round(number * Math.pow(10, precission)) / Math.pow(10, precission);
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.impossible = "No se puede calcular, porque el sistema es inestable";
  }

  r() {
    return this.props.lambda / this.props.mu;
  }

  p0() {
    if (this.usage() > 1 && !this.props.limit) {
      return 0;
    }

    let inner;
    if (!this.props.limit) {
      inner = (total, a, n) => total + Math.pow(this.r(), n) / factorial(n) + (Math.pow(this.r(), this.props.servers) / (factorial(this.props.servers) * (1 - this.usage())));
    } else if (this.usage() !== 1) {
      inner = (total, a, n) => total + Math.pow(this.r(), n) / factorial(n) + (Math.pow(this.r(), this.props.servers) * (1 - Math.pow(this.usage(), this.props.limit - this.props.servers + 1))) / (factorial(this.props.servers) * (1 - this.usage()));
    } else {
      inner = (total, a, n) => total + Math.pow(this.r(), n) / factorial(n) + (Math.pow(this.r(), this.props.servers) * (this.props.limit - this.props.servers + 1)) / factorial(this.props.servers);
    }
    
    return Math.pow(Array(this.props.servers).fill(0).reduce(inner, 0), -1);
  }
  
  pn(n) {
    if (n === 0) {
      return this.p0();
    }

    if (n >= 1 && n < this.props.servers) {
      return (Math.pow(this.r(), n) * this.p0()) / factorial(n);
    }
  
    if (!this.props.limit || n <= this.props.limit) {
      return (Math.pow(this.r(), n) * this.p0()) / (Math.pow(this.props.servers, n - this.props.servers) * factorial(this.props.servers));
    }
  
    return 0;
  }
  
  usage() {
    return this.props.lambda / (this.props.servers * this.props.mu);
  }
  
  averageQueueSize() {
    if (!this.p0()) {
      return this.impossible;
    }

    let usage = this.usage();
    if (this.usage() === 1 && this.props.limit) {
      usage -= 0.0001;
    }

    let calc = (Math.pow(this.r(), this.props.servers) * usage * this.p0()) / (factorial(this.props.servers) * Math.pow(1 - usage, 2));
  
    if (!this.props.limit) {
      return parseInt(calc);
    }

    return parseInt(calc * (1 - Math.pow(this.usage(), this.props.limit - this.props.servers) - (1 - this.usage()) * (this.props.limit - this.props.servers) * Math.pow(this.usage(), this.props.limit - this.props.servers)));
  }
  
  averageQueueTime() {
    if (!this.p0()) {
      return this.impossible;
    }

    if (!this.props.limit) {
      return this.averageQueueSize() / this.props.lambda;
    }

    return this.averageSystemSize() / (this.props.lambda * (1 - this.pn(this.props.limit))) - (1 / this.props.mu);
  }
  
  averageSystemTime() {
    if (!this.p0()) {
      return this.impossible;
    }

    return this.averageQueueTime() + (1 / this.props.mu);
  }
  
  averageSystemSize() {
    if (!this.p0()) {
      return this.impossible;
    }

    if (!this.props.limit) {
      return this.r() + this.averageQueueSize();
    }

    return this.averageQueueSize() + this.r() * (1 - this.pn(this.props.limit));
  }

  render() {
    let x = 0, probabilities = [];
    let px = this.pn(x), pxi = this.pn(x);

    while (pxi >= 0 && (px === -1 || px >= 0.0001) && (!this.props.limit || x <= this.props.limit)) {
      probabilities.push(
        <div className="row" key={x}>
          <div className="column">{x}</div>
          <div className="column">{probabilityToPercentage(px * 100, 2)}</div>
          <div className="column">{probabilityToPercentage(pxi * 100, 2)}</div>
        </div>
      ); 

      x++;
      px = this.pn(x);
      pxi += px;
    }

    const queue_time = this.averageQueueTime();
    const system_time = this.averageSystemTime();

    return (
      <div className="results">
        <button className="return-button" onClick={() => this.props.onQuit()}>x</button>
        <h1>Resultados</h1>
        <div className="block">
          <div className="row">
            Factor de utilización del sistema: {probabilityToPercentage(this.usage() * 100, 2)}
          </div>
        </div>
        <div className="block">
          <div className="row">
            Tiempo promedio en cola: {isNaN(queue_time) ? queue_time : `${formatNumber(queue_time, 3)} horas (${secondsToTime(queue_time * 3600)})`}
          </div>
        </div>
        <div className="block">
          <div className="row">
            Tiempo promedio en el sistema: {isNaN(system_time) ? system_time : `${formatNumber(system_time, 3)} horas (${secondsToTime(system_time * 3600)})`}
          </div>
        </div>
        <div className="block">
          <div className="row">
            Cantidad promedio de clientes en cola: {this.averageQueueSize()}
          </div>
        </div>
        <div className="block">
          <div className="row">
            Cantidad promedio de clientes en el sistema: {this.averageSystemSize()}
          </div>
        </div>
        <div className="block table">
          <div className="row">
            <h4>Tabla de probabilidades</h4>
          </div>
          <div className="row">
            <div className="column"><b>x</b></div>
            <div className="column"><b>P(x)</b></div>
            <div className="column"><b>P(x &lt;= xi)</b></div>
          </div>
          {probabilities}
        </div>
      </div>
    );
  }
}

export default Results;