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
  r() {
    return this.props.lambda / this.props.mu;
  }

  p0() {
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
    let calc = Math.pow(this.r(), this.props.servers) * this.usage() * this.p0() * Math.pow(1 - this.usage(), -2) / factorial(this.props.servers);
  
    if (!this.props.limit) {
      return parseInt(calc);
    }
  
    return parseInt(calc * (1 - Math.pow(this.usage(), this.props.limit - this.props.servers + 1) - (1 - this.usage()) * (this.props.limit - this.props.servers + 1) * Math.pow(this.usage(), this.props.limit - this.props.servers)));
  }
  
  averageQueueTime() {
    if (!this.props.limit) {
      return this.averageQueueSize() / this.props.lambda;
    }

    return this.averageSystemSize() / (this.props.lambda * (1 - this.pn(this.props.limit))) - (1 / this.props.mu);
  }
  
  averageSystemTime() {
    if (!this.props.limit) {
      return this.averageQueueTime() + (1 / this.props.mu);
    }

    return this.averageQueueSize() / (this.props.lambda * (1 - this.pn(this.props.limit)));
  }
  
  averageSystemSize() {
    if (!this.props.limit) {
      return this.r() + this.averageQueueSize();
    }

    return this.averageQueueSize() + this.r() * (1 - this.pn(this.props.limit));
  }

  render() {
    let n = 0;
    let pn = this.pn(n), pni = this.pn(n);
    let probabilities = [];

    do {
      probabilities.push(
        <div className="row" key={n}>
          <div className="column">{n}</div>
          <div className="column">{probabilityToPercentage(pn * 100, 4)}</div>
          <div className="column">{probabilityToPercentage(pni * 100, 4)}</div>
        </div>
      ); 

      n++;
      pn = this.pn(n);
      pni += pn;
    } while (pni < 0.99 && pn > 0.000001 && (!this.props.limit || n <= this.props.limit));

    const queue_time = this.averageQueueTime();
    const system_time = this.averageSystemTime();

    return (
      <div className="results">
        <h1>Resultados</h1>
        <div className="block">
          <div className="row">
            Factor de utilización del sistema: {probabilityToPercentage(this.usage() * 100, 2)}
          </div>
        </div>
        <div className="block">
          <div className="row">
            Tiempo promedio en cola: {formatNumber(queue_time, 3)} horas ({secondsToTime(queue_time * 3600)})
          </div>
        </div>
        <div className="block">
          <div className="row">
            Tiempo promedio en el sistema: {formatNumber(system_time, 3)} horas ({secondsToTime(system_time * 3600)})
          </div>
        </div>
        <div className="block table">
          <div className="row">
            <h4>Tabla de robabilidades</h4>
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