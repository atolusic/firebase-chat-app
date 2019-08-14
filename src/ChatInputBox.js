import React from 'react'
import { db } from './firebase'

function ChatInputBox({ user }) {
  const onSubmit = event => {
    event.preventDefault()
    const value = event.target.elements[0].value
    db
    .collection('channels')
    .doc('random')
    .collection('messages')
    .add({
      user: db.collection('users').doc(user.uid),
      text: value,
      createdAt: new Date(),
    })
    event.target.reset()
  }

  return (
    <form onSubmit={onSubmit} className="ChatInputBox">
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  )
}

export default ChatInputBox
