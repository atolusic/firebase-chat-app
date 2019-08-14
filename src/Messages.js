import React from 'react'
import useCollection from './useCollection'

function Messages() {
  const messages = useCollection('channels/general/messages', 'createdAt')

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {
        messages.map(message => {
          const { createdAt, text, id } = message

          if (messages.indexOf(message) === 0) {
            return (
              <div key={id}>
                  <div className="Day">
                    <div className="DayLine" />
                    <div className="DayText">12/6/2018</div>
                    <div className="DayLine" />
                  </div>
                  <div className="Message with-avatar">
                    <div className="Avatar" />
                    <div className="Author">
                      <div>
                        <span className="UserName">Ryan Florence </span>
                        <span className="TimeStamp">3:37 PM</span>
                      </div>
                      <div className="MessageContent">{text}</div>
                    </div>
                  </div>
              </div>
            )
          }

          return (
            <div key={id}>
              <div className="Message no-avatar">
                <div className="MessageContent">{text}</div>
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export default Messages
