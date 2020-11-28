import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.time_format = "**:**:**";
    this.time_mask = "--:--:--";
    this.time_regexp = /([0-1]\d|2[0-4]):[0-5]\d:[0-5]\d/;

    this.state = { lambda: this.time_mask, mu: this.time_mask, limit: "", errors: {} };
  }

  format(x, pattern, mask = "") {
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
    const val = this.format(target.value, this.time_format);
    this.setState({ [name]: this.format(target.value, this.time_format, this.time_mask) }, () => {
      target.selectionStart = target.selectionEnd = val.length
    });
  }

  handleLimitChange(value) {
    if (value.replace(/[^0-9]/g, "") === "" || parseInt(value.replace(/[^0-9]/g, "")) > 0) {
      this.setState({ limit: value.replace(/[^0-9]/g, "") });
    }
  }

  handleSubmit() {
    const format_error = "No está en el formato adecuado.";

    let errors = ["lambda", "mu"].reduce((errors, index) => {
      if (!this.time_regexp.test(this.state[index])) {
        errors[index] = format_error;
      } else if (this.state[index].split(':').reverse().reduce((result, current, index) => result + current * Math.pow(60,index), 0) === 0) {
        errors[index] = "El tiempo promedio no puede ser 0.";
      }
      return errors;
    }, {});

    if (!/^\d*$/g.test(this.state.limit)) {
      errors['limit'] = format_error;
    }

    this.setState({ errors: errors });

    if (!Object.keys(errors).length) {
      let values = ["lambda", "mu"].reduce(
        (values, index) => 
        Object.assign(values, { 
          [index]: this.state[index].split(':').reverse().reduce((result, current, index) => result + current * Math.pow(60,index), 0)
        }), 
        {}
      );
      if (parseInt(this.state.limit) && parseInt(this.state.limit) > 0) {
        values['limit'] = parseInt(this.state.limit);
      }
      this.props.onSubmit(values);
    }
  }
  
  render() {
    return (
      <div className="initial-form">
        <div className="form-element">
          <label htmlFor="lambda">Tiempo medio de llegada (HH:mm:ss)</label>
          <input type="text" className="form-input" value={this.state.lambda} onChange={event => this.handleDateChange("lambda", event.target)} />
          {this.state.errors.lambda && <p className="form-error">{this.state.errors.lambda}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="mu">Tiempo medio de servicio (HH:mm:ss)</label>
          <input type="text" className="form-input" value={this.state.mu} onChange={event => this.handleDateChange("mu", event.target)} />
          {this.state.errors.mu && <p className="form-error">{this.state.errors.mu}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="limit">Límite de la cola</label>
          <input type="text" className="form-input" maxLength="6" value={this.state.limit} onChange={event => this.handleLimitChange(event.target.value)} />
        </div>
        <div className="form-element">
          <button className="form-submit-button" onClick={this.handleSubmit.bind(this)}>Continuar</button>
        </div>
      </div>
    );
  }
};