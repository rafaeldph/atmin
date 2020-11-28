import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.time_format = "**:**:**";
    this.time_mask = "HH:mm:ss";
    this.state = { lambda: this.time_mask, mu: this.time_mask, limit: "" };
  }

  doFormat(x, pattern, mask = "") {
    let chars = x.replace(/[^0-9]/g, "").split('');
    let count = 0;
  
    let formatted = '';
    for (let i=0; i<pattern.length; i++) {
      if (chars[count]) {
        formatted += (/\*/.test(pattern[i])) ? chars[count++] : pattern[i];
      } else if (mask && mask[i]) {
        formatted += mask[i];
      }
    }

    return formatted;
  }

  handleDateChange(name, target) {
    const val = this.doFormat(target.value, this.time_format);
    this.setState({ [name]: this.doFormat(target.value, this.time_format, this.time_mask) }, () => {
      target.selectionStart = target.selectionEnd = val.length
    });
  }

  handleLimitChange(value) {
    this.setState({ limit: value.replace(/[^0-9]/g, "") })
  }

  render() {
    return (
      <div className="initial-form">
        <div className="form-element">
          <label htmlFor="lambda">Tiempo medio de llegada</label>
          <input type="text" className="form-input" value={this.state.lambda} onChange={event => this.handleDateChange("lambda", event.target)} />
        </div>
        <div className="form-element">
          <label htmlFor="mu">Tiempo medio de servicio</label>
          <input type="text" className="form-input" value={this.state.mu} onChange={event => this.handleDateChange("mu", event.target)} />
        </div>
        <div className="form-element">
          <label htmlFor="limit">Límite de la cola</label>
          <input type="text" className="form-input" value={this.state.limit} onChange={event => this.handleLimitChange(event.target.value)} />
        </div>
      </div>
    );
  }
};
