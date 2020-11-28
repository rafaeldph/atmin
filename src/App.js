import React from 'react';
import Form from './Form';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: <Form onSubmit={values => this.handleChange(values)} /> };
  }

  handleChange(values) {
  }

  render() {
    return (
      <div className="main-container">
        {this.state.Component}
      </div>
    );
  }
};
