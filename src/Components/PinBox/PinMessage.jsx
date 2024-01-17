import React from 'react'
import { HashLink } from 'react-router-hash-link'
import TypeMessage from '../TypeMessage/TypeMessage'
import messageType from '../../Utility/MessageType'

const PinMessage = ({ title, index, show, arr, id }) => {
    return (
        <>
            <HashLink
                to={`#${id}`}
                scroll={(el) =>
                    el.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
                className="flex gap-3"
            >
         
                    {title&& title[0]?.type === 'img' || title&& title[0]?.type === 'video' ? (
                            <TypeMessage dis={title} w={'w-9 aspect-square'} />
                        ):null}
              
                <div className="flex flex-col gap-0.5 ">
                    <p className="font-semibold text-indigo-500 text-sm">
                        Pinned message #{index + 1}
                    </p>
                    <p className="text-[14px] truncate " dir='auto'>
                        {title &&
                        title[0]?.type !== 'img' &&
                        title[0]?.type !== 'video' ? (
                            <TypeMessage dis={title} />
                        ) : (
                           title&& messageType(title[0]?.type, title[0]?.name)
                        )}
                    </p>
                </div>
            </HashLink>
        </>
    )
}

export default PinMessage
