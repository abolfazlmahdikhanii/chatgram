import React from 'react'

const ReactionEmoji = ({emojiName,alt}) => {
  return (
    <picture  className="cursor-pointer">
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