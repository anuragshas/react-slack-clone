import React from 'react';

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    })
    this.props.onChange();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <form className="send-message-form" onSubmit={(e) => this.onSubmit(e)}>
        <input
          type="text"
          placeholder="Type Message and Press Enter"
          onChange={(e) => this.onChange(e)}
          value={this.state.text}
          disabled={this.props.disabled}
        />
      </form>
    );
  }
}

export default SendMessageForm;