import React, { memo, useContext, useEffect, useState } from 'react'
import Uploader from '../../Uploader/Uploader'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext'

const SelectBox = ({
  show,
  close,
  setImages,
  setFilesUpload,
  setSelectedFile,
  setShowUploaderFileModal,
  setShowImageUploaderModal
}) => {


  const {user}=useContext(UserContext)
  const checkIsimageOrIsVideo = (type) => {
    if (type === 'video/mp4' || type === 'video/webm') {
      return 'video'
    } else if (
      type === 'image/png' ||
      type === 'image/jpeg' ||
      type === 'image/gif'
    ) {
      return 'img'
    }
  }
  // uploader image
  const uploadImageHandler = (e) => {
    let images = []
    
    for (let i = 0; i < e?.target.files?.length; i++) {
      images.push({
        id: crypto.randomUUID(),
        src: URL.createObjectURL(e.target.files[i]),
        size: e.target.files[i].size,
        type: checkIsimageOrIsVideo(e.target.files[i]?.type),
        progress: e.target.duration,
        sentat: new Date().getTime(),
        senderid:user.userid
      })
    }
    setSelectedFile(e.target.files)
    setImages(images)

    if (e.target.files?.length > 0) {
      setShowImageUploaderModal(true)
    }
  }
  // upload file
  const uploadFileHandler = (e) => {
    let files = []

    for (let i = 0; i < e.target.files.length; i++) {

      files.push({
        id: crypto.randomUUID(),
        src: URL.createObjectURL(e.target.files[i]),
        size: e.target.files[i].size,
        name: e.target.files[i].name,
        type: "file",
        senderid:user.userid,
        sentat: new Date().getTime(),
      })
    }
    setSelectedFile(e.target.files)
    setFilesUpload(files)

    if (e.target.files?.length > 0) {
      setShowUploaderFileModal(true)
    }
  }


  return (

      <div
        className={`select-box ${
          show ? 'scale-100 opacity-100 ' : 'scale-0 opacity-0 '
        }`}
        onMouseOut={close}
        onTouchEnd={close}
        onTouchCancel={close}
      >
        {/* item1 */}
        <label htmlFor="img" className="select-box--item" onClick={close}>
          <input
            type="file"
            id="img"
            multiple
            className="hidden"
            accept="image/png,image/jpeg,image/gif,video/mp4,video/mov"
            onChange={uploadImageHandler}
          />
          {/* icon */}
          <p className="grid place-items-center">
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 10a2 2 0 100-4 2 2 0 000 4zM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          <p className="font-[500] text-[14px]">Photo or Video</p>
        </label>
        {/* item2 */}
        <label htmlFor="file" className="select-box--item" onClick={close}>
          <input
            type="file"
            id="file"
            className="hidden"
            multiple
            onChange={uploadFileHandler}
          />
          {/* icon */}
          <p className="grid place-items-center">
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10h-4c-3 0-4-1-4-4V2l8 8z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          <p className="font-[500] text-[14px]">Document</p>
        </label>
      </div>

    
    
  )
}

export default memo(SelectBox)
