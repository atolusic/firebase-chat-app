import React, { useEffect, useRef } from 'react'
import dateFormat from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'

import useCollection from './useCollection'
import useDocWithCache from './useDocWithCache'

function ChatScroller(props) {
  const ref = useRef()
  const shouldScroll = useRef(true)

  useEffect(() => {
    if (shouldScroll.current) {
      const node = ref.current
      node.scrollTop = node.scrollHeight
    }
  })

  const handleScroll = () => {
    const node = ref.current
    const { scrollTop, clientHeight, scrollHeight } = node
    const atBottom = scrollHeight === clientHeight + scrollTop
    shouldScroll.current = atBottom
  }

  return (
    <div {...props} ref={ref} onScroll={handleScroll} />
  )
}

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt')

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {
        messages.map((message, index) => {
          const prevMessage = messages[index - 1]
          const showDay = showShowDay(prevMessage, message)
          const showAvatar = shouldShowAvatar(prevMessage, message)

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
    </ChatScroller>
  )
}

function FirstMessageFromUser({ message, showDay }) {
  const { text, user } = message
  const author = useDocWithCache(user.path)
  const time = dateFormat(message.createdAt.seconds * 1000, 'h:mm A')

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {
              new Date(message.createdAt.seconds * 1000)
              .toLocaleDateString()
            }
          </div>
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
            <span className="TimeStamp">{time}</span>
          </div>
          <div className="MessageContent">{text}</div>
        </div>
      </div>
    </div>

  )
}

function shouldShowAvatar(prevMessage, message) {
  const isFirst = !prevMessage
  if (isFirst) {
    return true
  }

  const differentUser = message.user.id !== prevMessage.user.id
  if (differentUser) {
    return true
  }

  const hasBeenAWhile =
    message.createdAt.seconds -
    prevMessage.createdAt.seconds > 180

  return hasBeenAWhile
}

function showShowDay(prevMessage, message) {
  const isFirst = !prevMessage
  if (isFirst) {
    return true
  }

  const isNewDay = !isSameDay(
    prevMessage.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  )

  return isNewDay
}

export default Messages
