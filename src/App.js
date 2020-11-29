import React from 'react';
import Form from './Form';
import Game from './Game';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { component: <Form onSubmit={values => this.initGame(values)} /> };
  }

  initGame(values) {
    this.setState({ component: <Game {...values} /> });
  }

  render() {
    return (
      <div className="main-container">
        {this.state.component}
      </div>
    );
  }
};
