import React, { Component } from 'react';

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.username) {
      this.props.onSubmit(this.state.username);
    }
  }

  render() {
    return (
      <div className="username-screen">
        <div>
          <h1>What is your Name?</h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              onChange={this.onChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default UsernameForm;