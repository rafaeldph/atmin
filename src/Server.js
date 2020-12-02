import React from 'react';

class Server extends React.Component {
  render() {
    return (
      <div className="server-area">
        <div className="server"></div>
        <div className="client">{this.props.client}</div>
      </div>
    );
  }
}

export default Server;