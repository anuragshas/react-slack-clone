import React from 'react';

class UsernameForm extends React.Component {
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
      <div>
        <div>
          <h1>What is your Name?</h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UsernameForm;