import React from 'react'
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
          <a key={channel.id} href={`/channel/${channel.id}`}># {channel.id}</a>
        ))}
      </nav>
    </div>
  )
}

export default Nav
