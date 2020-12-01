import React from 'react';

class Server extends React.Component {
  render() {
    return (
      <div className="server-area">
        <div className="server"></div>
        <div className="client" style={{backgroundColor: this.props.clientColor}}></div>
      </div>
    );
  }
}

export default Server;