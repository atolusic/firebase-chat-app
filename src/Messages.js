import React, { useState, useEffect } from 'react'
import useCollection from './useCollection'
import { db } from './firebase';

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt')

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {
        messages.map((message, index) => {
          const prevMessage = messages[index - 1]
          const showDay = false
          const showAvatar = !prevMessage || message.id !== prevMessage.id

          return showAvatar ? (
            <FirstMessageFromUser
              showDay={showDay}
              key={message.id}
              message={message}
            />
          ) : (
            <div key={message.id}>
              <div className="Message no-avatar">
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

function useDoc(path) {
  const [doc, setDoc] = useState()

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id,
      })
    })
  }, [path])

  return doc
}

function FirstMessageFromUser({ message, showDay }) {
  const { text, id, user } = message
  const author = useDoc(user.path)

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : ''
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">
              {author && author.displayName}
            </span>{" "}
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{text}</div>
        </div>
      </div>
    </div>

  )
}

export default Messages
