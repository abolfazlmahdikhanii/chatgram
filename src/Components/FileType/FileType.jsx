import React, { useState } from 'react'
import FileItem from '../FIleItem/FileItem'
import Progress from '../UI/Progress/Progress'
import AudioFile from '../AudioFIle/AudioFile'
import Video from '../Video/Video'
import FileIcon from '../UI/FIleIcon/FileIcon'

const FileType = ({
    type,
    src,
    name,
    size,
    progress,
    onRemove,
    id,
    from,
    contextMenu,
    idType,
    messageId,
    isColor,
    caption,
    setAudio,
    autoPlay=true,
    imgSize,
    isFile=true,
    isChatInfo=false,
    setShowPreview
}) => {
    

    let file = null

    if (type == 'video') {
        file = (
            <Video
                contextMenu={contextMenu}
                progress={progress}
                messageId={messageId}
                idType={idType}
                src={src}
                onRemove={onRemove}
                autoPlay={autoPlay}
                isChatInfo={isChatInfo}
                setShowPreview={setShowPreview}
                from={from}
            />
        )
    } else if (type == 'mp3') {
        file = (
            <AudioFile
                path={src}
                size={size}
                name={name}
                onRemove={() => onRemove(messageId, idType)}
                isColor={isColor}
                setAudio={setAudio}
               
            />
        )
    } else if (type == 'img') {
        file = (
  
            <li
                className={` ${imgSize?'h-[100px]':'h-[210px]'} overflow-hidden inline-block rounded-xl basis-[40%]  bg-gray-200/20 flex-grow flex-1 relative`}
                onContextMenu={(e) => contextMenu(e, messageId, idType,isChatInfo)}
            >
                <Progress
                    size={progress}
                    onRemove={() => onRemove(messageId, idType)}
                />
                <img
                    src={src}
                    alt=""
                    className="object-cover w-full h-full rounded-xl "
                    onClick={()=>setShowPreview({show:true,type:"img",from,src})}
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
                onRemove={() => onRemove(messageId, idType)}
                onContext={(e) => contextMenu(e, messageId, idType,isChatInfo)}
                isColor={isColor}
                
            />
        )
    }
    return <>{file}</>
}

export default FileType
