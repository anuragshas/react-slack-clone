import React from 'react'

const Message = (props) => (
  <div className="message">
    <div className="message-username">{props.user}</div>
    <div className="message-text">{props.text}</div>
  </div>
)

export default Message;
