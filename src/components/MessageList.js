import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul>
        {this.props.messages.map((message, index) => {
          return <li key={index}>
            <div>
              <span>{message.senderId}</span>
              <p>{message.text}</p>
            </div>
          </li>
        })}
      </ul>
    );
  }
}

export default MessageList;