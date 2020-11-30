import React from 'react';

export default class Server extends React.Component {
  render() {
    return (
      <div className="server-area">
        <div className="server"></div>
        {this.props.client}
      </div>
    );
  }
};