import React, { useEffect } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import FileIcon from '../UI/FIleIcon/FileIcon'
import ProgressFile from '../UI/ProgressFile/ProgressFile'
import { useState } from 'react'

const FileItem = ({
  type,
  src = null,
  name,
  size,
  onRemove,
  message = false,
  from,
  onContext,
  isColor,
  isFile,
  progress,
  isCompletedUploaded,
  onDownload,
}) => {


  const formatSize = (bytes) => {
    if (bytes == 0) return '0 Bytes'
    var k = 1024,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }
  return (
    <>
      {!message ? (
        <DefaultFile
          type={type}
          src={src}
          message={message}
          from={from}
          size={size}
          name={name}
          onRemove={onRemove}
          formatSize={formatSize}
          onContext={onContext}
          progress={progress}
      
        />
      ) : (
        <MessageFile
          type={type}
          src={src}
          message={message}
          from={from}
          size={size}
          name={name}
          formatSize={formatSize}
          onRemove={onRemove}
          onContext={onContext}
          isColor={isColor}
          progress={progress}
          isCompletedUploaded={isCompletedUploaded}
          onDownload={onDownload}
        />
      )}
    </>
  )
}
const DefaultFile = ({
  type,
  src,
  message,
  from,
  size,
  name,
  onRemove,
  formatSize,
  onContext,
  isColor,

}) => {
  return (
    <li className={`file-item relative  w-full px-3`} onContextMenu={onContext}>
      <div>
        <FileIcon
          type={type}
          path={src ? src : ''}
          message={message}
          from={from}
          isColor={isColor}
        />
      </div>
      <div className="flex flex-col gap-2 max-w-[200px]">
        <p className={`text-lg dark:text-white font-semibold truncate w-full text-gray-700`}>
          {name}
        </p>
        <p className='text-gray-500 dark:text-gray-300'>{formatSize(size)}</p>
      </div>

      <div className="self-center  w-full flex justify-end">
        <button className="btn btn-square btn-sm " onClick={onRemove}>
          <MdOutlineDeleteOutline size={21} />
        </button>
      </div>
    </li>
  )
}
const MessageFile = ({
  type,
  src,
  message,
  from,
  size,
  name,
  formatSize,
  onRemove,
  onContext,
  isColor,
  progress,
isCompletedUploaded,
onDownload
}) => {
 
  return (
    <li
      className={`file-item-1 relative  w-full hover:bg-transparent`}
      onContextMenu={onContext}
    >
      <div>
        <FileIcon
          type={type}
          path={src ? src : ''}
          message={message}
          from={from}
          isColor={isColor}
        />
      </div>
      <div className="flex flex-col gap-2 max-w-[200px]">
        <p className={`text-sm dark:text-white font-semibold truncate w-full text-gray-600 `}>
          {name}
        </p>
        <p className={`text-[12px] dark:text-gray-300 text-gray-500`}>{formatSize(size)}</p>
        <ProgressFile progress={progress} isCompletedUploaded={isCompletedUploaded} onDownload={onDownload}  />
      </div>
    </li>
  )
}
export default FileItem
