import React, { Component } from 'react';
import UsernameForm from './components/UsenameForm';

class App extends Component {
  render() {
    return <UsernameForm onSubmit={username =>alert(username)}/>
  }
}

export default App
