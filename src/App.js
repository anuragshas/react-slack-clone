import React, { Component } from 'react';

import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'WhatisYourUsernameScreen',
      currentUsername: '',
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        console.log('success');
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.currentScreen === 'WhatisYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen username={this.state.currentUsername} />
    }

  }
}

export default App;
