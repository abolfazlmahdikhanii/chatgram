import React from 'react'

const TypeMessage = ({ dis, w }) => {
    let element = null
    if (dis) {
        if (typeof dis === 'string') {
            element = (
                <p
                    dangerouslySetInnerHTML={{
                        __html: dis,
                    }}
                ></p>
            )
        }
        if (dis[0]?.type === 'img') {
            element = (
               <div>
                 <div className={`${w ? w : 'w-11'} h-full mask mask-squircle `}>
                    <img
                        src={dis[0]?.src}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
               </div>
            )
        }
        if (dis[0]?.type === 'video') {
            element = (
                <div>
                    <div
                        className={`${
                            w ? w : 'w-11'
                        } h-full mask mask-squircle`}
                    >
                        <video
                            src={dis[0]?.src}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )
        }
        if (
            dis[0]?.type === 'file' ||
            (dis[0]?.type === 'mp3' && dis[0]?.name !== '')
        ) {
            element = <p className="text-[14px] ">{dis[0]?.name}</p>
        }
        if (dis[0]?.type === 'mp3' && dis[0]?.name === '') {
            element = <p className="text-[14px] ">Voice Message</p>
        }
    }

    return <>{element ? element : 'Media'}</>
}

export default TypeMessage
