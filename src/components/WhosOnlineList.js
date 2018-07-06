import React, { Component } from 'react';
import moment from 'moment';

class WhosOnlineList extends Component {
  render() {
    if (this.props.users) {
      return (
        <ul>
          {this.props.users.map((user, index) => {
            return (<li key={index}>
              <p>{user.name}({user.presence.state})</p>
              {user.presence.lastSeenAt && <p>Last Seen:{moment(user.presence.lastSeenAt).fromNow()}</p>}
            </li>)
          })}
        </ul>
      )
    }
    else {
      return (
        <div>Loading...</div>
      );
    }

  }
}

export default WhosOnlineList;