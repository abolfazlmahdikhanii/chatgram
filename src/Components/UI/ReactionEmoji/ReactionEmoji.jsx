import React from 'react'

const ReactionEmoji = ({emojiName,alt,onReaction}) => {
  return (
    <picture  className="cursor-pointer" onClick={onReaction}>
    <source
      srcSet={`https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiName}/512.webp`}
      type="image/webp"
    />
    <img
      src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiName}/512.gif`}
      alt={alt}
      width="23"
      height="23"
    />
  </picture>
  )
}

export default ReactionEmoji