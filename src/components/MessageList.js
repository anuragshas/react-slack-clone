import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';
import TypingIndicator from './TypingIndicator';

class MessageList extends Component {
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    node.scrollTop = node.scrollHeight;
  }

  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          let active = '';
          let user = message.senderId;
          if (this.props.currentUser === message.senderId) {
            active = 'active';
            user = 'You';
          }
          return <Message
            key={index}
            user={user}
            text={message.text}
            active={active} />
        })}
        <TypingIndicator usersWhoAreTyping={this.props.usersWhoAreTyping} />
      </div>
    )
  }
}

export default MessageList;