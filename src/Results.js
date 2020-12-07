import React from 'react';

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function probabilityToPercentage(probability, precission) {
  return `${Math.round(probability * (precission * 100)) / (precission * 100)}%`;
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
      inner = (total, a, n) => total + Math.pow(this.r(), n) / factorial(n) + (Math.pow(this.r(), this.props.servers) * Math.pow(1 - this.usage(), this.props.limit - this.props.servers + 1)) / (factorial(this.props.servers) * (1 - this.usage()));
    } else {
      inner = (total, a, n) => total + Math.pow(this.r(), n) / factorial(n) + (Math.pow(this.r(), this.props.servers) * (this.props.limit - this.props.servers + 1)) / factorial(this.props.servers);
    }
    
    return Math.pow(Array(this.props.servers).fill(0).reduce(inner, 0), -1);
  }
  
  pn(n) {
    if (n >= 1 && n < this.props.servers) {
      return (Math.pow(this.props.lambda, n) * this.p0()) / (factorial(n) * Math.pow(this.props.mu, n));
    }
  
    if (!this.props.limit || n <= this.props.limit) {
      return (Math.pow(this.props.lambda, n) * this.p0()) / (Math.pow(this.props.servers, n - this.props.servers) * factorial(this.props.servers) * Math.pow(this.props.mu, n));
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
    let probabilities = [
      <tr key={0}>
        <td>{0}</td>
        <td>{probabilityToPercentage(this.p0() * 100, 4)}</td>
      </tr>
    ];
    let n = 1;
    while (true) {
      probabilities.push(
        <tr key={n}>
          <td>{n}</td>
          <td>{probabilityToPercentage(this.pn(n) * 100, 4)}</td>
        </tr>
      );

      n++;
      if (this.pn(n) < 0.0001 && (!this.props.limit || n >= this.props.limit)) {
        break;
      }
    }

    return (
      <div className="results">
        <table>
          <tbody>
            <tr>
              <th>Factor de utilización del sistema:</th>
              <td>{probabilityToPercentage(this.usage() * 100, 2)}</td>
            </tr>
            <tr>
              <th>Tiempo promedio en cola:</th>
              <td>{Math.round(this.averageQueueTime(), 2)} horas</td>
            </tr>
            <tr>
              <th>Tiempo promedio en el sistema:</th>
              <td>{Math.round(this.averageSystemTime(), 2)} horas</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>n</th>
              <th>P[n]</th>
            </tr>
          </thead>
          <tbody>
            {probabilities}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Results;