import React from 'react';
import Form from './Form';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { started: false, data: {} };
  }

  handleStarting(values) {
    console.log(values);
  }

  render() {
    let Component = (this.state.started) ? Form : Form;

    return (
      <div className="main-container">
        <Component onSubmit={values => this.handleStarting(values)} />
      </div>
    );
  }
};
