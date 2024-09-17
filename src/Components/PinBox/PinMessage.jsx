import React from 'react'
import { HashLink } from 'react-router-hash-link'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageType from '../../Utility/messageTypeChecker'
import decodeMessage from '../../Utility/decodeMessage'

const PinMessage = ({ title, index, show, arr, id,type,name }) => {
  
  return (
    <>
      <HashLink
        to={`#${id}`}
        scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
        className="flex gap-3"
      >
        {(type === 'img') ||
        (type === 'video') ? (
          <TypeMessage dis={title} w={'w-9 aspect-square'} />
        ) : null}

        <div className="flex flex-col gap-0.5 ">
          <p className="font-semibold text-indigo-500 text-sm">
            Pinned message #{index + 1}
          </p>
          <p className="text-[14px] truncate " dir="auto">
            {type==='text'&&!name ? (
              <TypeMessage dis={title} type={type} />
            ) : (
              messageType(type,name)
            )}
          </p>
        </div>
      </HashLink>
    </>
  )
}

export default PinMessage
