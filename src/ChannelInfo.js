import React, { useEffect, useRef } from 'react'

import useDoc from './useDoc'

function useChatScroll(ref) {
  useEffect(() => {
    const node = ref.current
    node.scrollTop = node.scrollHeight
  })
}

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`)
  const scrollerRef = useRef()
  useChatScroll(scrollerRef)

  return (
    <div ref={scrollerRef} className="ChannelInfo">
      <div className="Topic">
        Topic:{" "}
        <input
          className="TopicInput"
          defaultValue={channel && channel.topic}
        />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  )
}

export default ChannelInfo
