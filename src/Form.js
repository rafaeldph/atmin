import React from 'react';

function calcSeconds(time) {
  return time.split(':').reverse().reduce((result, current, index) => result + current * Math.pow(60,index), 0);
}

function format(x, pattern, mask = "") {
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

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.time_format = "**:**:**";
    this.time_mask = "--:--:--";
    this.time_regexp = /([0-1]\d|2[0-4]):[0-5]\d:[0-5]\d/;

    this.state = { lambda: this.time_mask, mu: this.time_mask, observe: this.time_mask, limit: "", servers: "", errors: {} };
  }

  handleDateChange(name, target) {
    this.setState(
      { [name]: format(target.value, this.time_format, this.time_mask) }, 
      () => target.selectionStart = target.selectionEnd = format(target.value, this.time_format).length
    );
  }

  handleIntegerChange(name, value) {
    if (value.replace(/[^0-9]/g, "") === "" || parseInt(value.replace(/[^0-9]/g, "")) > 0) {
      this.setState({ [name]: value.replace(/[^0-9]/g, "") });
    }
  }

  handleSubmit() {
    const format_error = "No está en el formato adecuado.";

    let errors = ["lambda", "mu", "observe"].reduce((errors, index) => {
      if (!this.time_regexp.test(this.state[index])) {
        errors[index] = format_error;
      } else if (calcSeconds(this.state[index]) === 0) {
        errors[index] = "El tiempo no puede ser 0.";
      }
      return errors;
    }, {});

    if (!/^\d*$/g.test(this.state.limit)) {
      errors['limit'] = format_error;
    }

    if (!/^\d+$/g.test(this.state.servers)) {
      errors['servers'] = "Es un campo requerido";
    }

    this.setState({ errors: errors });

    if (!Object.keys(errors).length) {
      let values = ["lambda", "mu", "observe"].reduce(
        (values, index) => 
        Object.assign(values, { 
          [index]: calcSeconds(this.state[index])
        }), 
        { servers: parseInt(this.state.servers) }
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
        <h1>Atmin</h1>
        <div className="form-inputs-container">
          <div className="form-element">
            <label htmlFor="lambda">Tiempo medio de llegada <br /><small>(HH:mm:ss)</small></label>
            <input type="text" className="form-input" value={this.state.lambda} onChange={event => this.handleDateChange("lambda", event.target)} />
            {this.state.errors.lambda && <p className="form-error">{this.state.errors.lambda}</p>}
          </div>
          <div className="form-element">
            <label htmlFor="mu">Tiempo medio de servicio <br /><small>(HH:mm:ss)</small></label>
            <input type="text" className="form-input" value={this.state.mu} onChange={event => this.handleDateChange("mu", event.target)} />
            {this.state.errors.mu && <p className="form-error">{this.state.errors.mu}</p>}
          </div>
          <div className="form-element">
            <label htmlFor="servers">Cantidad de servidores</label>
            <input type="text" className="form-input" maxLength="2" value={this.state.servers} onChange={event => this.handleIntegerChange("servers", event.target.value)} />
            {this.state.errors.servers && <p className="form-error">{this.state.errors.servers}</p>}
          </div>
          <div className="form-element">
            <label htmlFor="limit">Límite de la cola</label>
            <input type="text" className="form-input" maxLength="6" value={this.state.limit} placeholder="Sin límite" onChange={event => this.handleIntegerChange("limit", event.target.value)} />
          </div>
          <div className="form-element">
            <label htmlFor="observe">Observar durante <br /><small>(HH:mm:ss)</small></label>
            <input type="text" className="form-input" value={this.state.observe} onChange={event => this.handleDateChange("observe", event.target)} />
            {this.state.errors.observe && <p className="form-error">{this.state.errors.observe}</p>}
          </div>
        </div>
        <button className="form-submit-button" onClick={() => this.handleSubmit()}>Continuar</button>
      </div>
    );
  }
};