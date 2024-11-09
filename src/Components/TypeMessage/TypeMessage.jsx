import React, { useEffect, useState } from 'react'
import { FcDocument } from 'react-icons/fc'
import decodeMessage from '../../Utility/decodeMessage'
import { supabase } from '../../superbase'

const TypeMessage = ({ dis,type,name, w }) => {
    const [url,setUrl]=useState("")
    useEffect(() => {
        if (type === 'img' ||
          type === 'video') fetchImage(dis);
      }, [dis]);
    
      const fetchImage = async (path) => {
      
          const { data, error } = await supabase.storage.from('uploads').createSignedUrl(path, 120);
          if (!error) setUrl(data.signedUrl);
       
      };
    let element = null
    if (dis) {
        if (type==='text') {
            element = (
                <div
                dir='auto'
                className='truncate w-[110px]'
                    dangerouslySetInnerHTML={{
                        __html: decodeMessage(dis),
                    }}
                ></div>
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
                            src={!url?decodeMessage(dis):url}
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
                           src={!url?decodeMessage(dis):url}
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
        if (type == 'mp3' || type == 'audio/webm'||type?.includes('audio') && name !== '') {
            element = (
                <p className="text-[14px] truncate w-[50%]">{name}</p>
            )
        }
        if (type == 'mp3' || type == 'audio/webm'||type?.includes('audio')  && name === '') {
            element = <p className="text-[14px] ">Voice Message</p>
        }
    }

    return <>{element ? element : 'Media'}</>
}

export default TypeMessage
