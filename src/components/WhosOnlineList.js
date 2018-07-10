import React, { Component } from 'react';
import moment from 'moment';

class WhosOnlineList extends Component {
  render() {
    if (this.props.users) {
      return (
        <div className="rooms-list">
          <h3>Online Members:</h3>
          <ul>
            {this.props.users.map((user, index) => {
              let active = '';
              if (user.presence.state === 'online') {
                active = 'active'
              }
              return (<li className={'user ' + active} key={index}>
                <p> <span className={'dot ' + active}></span> {user.name}</p>
                {user.presence.lastSeenAt &&
                  <p className="last-seen">
                    last seen {moment(user.presence.lastSeenAt).fromNow()}
                  </p>}
              </li>)
            })}
          </ul>
        </div>
      )
    }
    else {
      return (
        <div className="rooms-list">Loading...</div>
      );
    }

  }
}

export default WhosOnlineList;