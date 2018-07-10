import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';

import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import WhosOnlineList from './WhosOnlineList';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: {},
      currentRoom: {},
      usersWhoAreTyping: [],
    }
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:2c28e8eb-bba2-4821-b734-f4d262c64726',
      userId: this.props.username,
      tokenProvider: new TokenProvider({
        url: 'http://localhost:3001/authenticate',
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          currentUser
        })
        return currentUser.subscribeToRoom({
          roomId: 11365762,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              });
            },
            onUserJoined: () => this.forceUpdate(),
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
          }
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error(error));
  }

  sendMessage(text) {
    this.state.currentUser
      .sendMessage({
        roomId: this.state.currentRoom.id,
        text
      })
      .catch(err => console.error(err));
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="chat-screen">
        <WhosOnlineList users={this.state.currentRoom.users} />
        <MessageList
          messages={this.state.messages}
          usersWhoAreTyping={this.state.usersWhoAreTyping}
          currentUser={this.state.currentUser.name} />
        <SendMessageForm
          onSubmit={(text) => this.sendMessage(text)}
          onChange={() => this.sendTypingEvent()} />
      </div>
    );
  }
}

export default ChatScreen;