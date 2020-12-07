import React from 'react';
import Form from './Form';
import Game from './Game';
import Results from './Results';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = { component: <Form onSubmit={values => this.initGame(values)} /> };
    this.state = this.initialState;
  }

  initGame(values) {
    this.setState({ component: <Game {...values} onFinish={results => this.handleFinish(results)} /> });
  }

  handleFinish(values) {
    this.setState({ component: <Results {...values} onQuit={() => this.setState(this.initialState)} /> });
  }

  render() {
    return (
      <div className="main-container">
        {this.state.component}
      </div>
    );
  }
}

export default App;