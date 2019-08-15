import React from 'react'
import { Link } from '@reach/router'

import useCollection from './useCollection'
import { firebase } from './firebase'

function Nav({ user }) {
  const channels = useCollection('channels')

  const onLogOutClickHandler = e => {
    firebase.auth().signOut()
  }

  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src={user.photoUrl}
        />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button onClick={onLogOutClickHandler} className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link
            key={channel.id}
            to={`/channel/${channel.id}`}>
              # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Nav
