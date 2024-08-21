import React from 'react'
import { FcDocument } from 'react-icons/fc'
import decodeMessage from '../../Utility/decodeMessage'

const TypeMessage = ({ dis,type,name, w }) => {
    let element = null
    if (dis) {
        if (type==='text') {
            element = (
                <p
                dir='auto'
                    dangerouslySetInnerHTML={{
                        __html: decodeMessage(dis),
                    }}
                ></p>
            )
        }
        if (type === 'img') {
            element = (
                <div>
                    <div
                        className={`${
                            w ? w : 'w-11'
                        } h-full mask mask-squircle `}
                    >
                        <img
                            src={decodeMessage(dis)}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )
        }
        if (type === 'video') {
            element = (
                <div>
                    <div
                        className={`${
                            w ? w : 'w-11'
                        } h-full mask mask-squircle`}
                    >
                        <video
                            src={decodeMessage(dis)}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )
        }
        if (type === 'file') {
            element = (
                <div className='flex gap-1.5 items-center w-full'>
                    <p>
                        <FcDocument />
                    </p>
                    <p className="text-[14px] truncate w-[40%]">
                        {name}
                    </p>
                </div>
            )
        }
        if (type == 'mp3' || type == 'audio/webm' && name !== '') {
            element = (
                <p className="text-[14px] truncate w-[50%]">{name}</p>
            )
        }
        if (type == 'mp3' || type == 'audio/webm'  && name === '') {
            element = <p className="text-[14px] ">Voice Message</p>
        }
    }

    return <>{element ? element : 'Media'}</>
}

export default TypeMessage
