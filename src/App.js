import React from 'react';
import Form from './Form';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: Form, data: {} };
  }

  handleChange(values) {
    this.setState({ data: values });
  }

  render() {
    return (
      <div className="main-container">
        <this.state.Component onSubmit={values => this.handleChange(values)} />
      </div>
    );
  }
};
