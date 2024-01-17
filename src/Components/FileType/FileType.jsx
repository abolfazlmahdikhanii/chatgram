import React, { useContext, useState } from 'react'
import FileItem from '../FIleItem/FileItem'
import Progress from '../UI/Progress/Progress'
import AudioFile from '../AudioFIle/AudioFile'
import Video from '../Video/Video'
import FileIcon from '../UI/FIleIcon/FileIcon'
import { ChatContext } from '../../Context/ChatContext'

const FileType = ({
    type,
    src,
    name,
    size,
    progress,
    id,
    from,
    idType,
    messageId,
    isColor,
    caption,
    autoPlay=true,
    imgSize,
    isFile=true,
    isChatInfo=false,
    contextMenu
}) => {
    
    const {removeMessages,setShowPreview,setAudio}=useContext(ChatContext)

    let file = null




    if (type == 'video') {
        file = (
            <Video
                contextMenu={contextMenu}
                progress={progress}
                messageId={messageId}
                idType={idType}
                src={src}
                onRemove={removeMessages}
                autoPlay={autoPlay}
                isChatInfo={isChatInfo}
                setShowPreview={setShowPreview}
                from={from}
                caption={caption}
            />
        )
    } else if (type == 'mp3') {
        file = (
            <AudioFile
                path={src}
                size={size}
                name={name}
                onRemove={() => removeMessages(messageId, idType)}
                isColor={isColor}
                setAudio={setAudio}
               
            />
        )
    } else if (type == 'img') {
        file = (
  
            <li
                className={` ${imgSize?'h-[100px]':'h-[210px]'} overflow-hidden inline-block rounded-xl basis-[40%]  dark:bg-gray-200/20 flex-grow flex-1 relative bg-gray-400/20`}
                onContextMenu={(e) => contextMenu(e, messageId, idType,isChatInfo)}
            >
                <Progress
                    size={progress}
                    onRemove={() => removeMessages(messageId, idType)}
                />
                <img
                    src={src}
                    alt=""
                    className="object-cover w-full h-full rounded-xl "
                    onClick={()=>setShowPreview({show:true,type:"img",from,src,messageId,caption})}
                />
            </li>
        
        )
    } else if(type=="file"&&!isFile) {
        file = (
            <div>
            <FileIcon
              type={name?.split('.').pop()}
              path={src ? src : ""}
              message={true}
              from={from}
              isColor={isColor}
              isFile={false}
              onContext={(e) => contextMenu(e, messageId, idType,isChatInfo)}
            />
          </div>
        )
    
    } else {
        file = (
            <FileItem
                name={name}
                type={name?.split('.').pop()}
                src={src}
                size={size}
                message={true}
                from={from}
                onRemove={() => removeMessages(messageId, idType)}
                onContext={(e) => contextMenu(e, messageId, idType,isChatInfo)}
                isColor={isColor}
                
            />
        )
    }
    return <>{file}</>
}

export default FileType
