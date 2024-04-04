import React, { useEffect, useState, useRef } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import chatData from '../../../data'
import { IoCloseSharp } from 'react-icons/io5'
import { FaPlay } from 'react-icons/fa6'
import { FaPause } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import StoryEditor from './StoryEditor'
import StoryForm from '../StoryForm/StoryForm'

const StoryCreator = ({ show, userId, close }) => {
  const StoryData = chatData
  const [fileUpload, setFileUpload] = useState(null)
  const [addText, setAddText] = useState(false)
  const [addContent, setAddContent] = useState(null)
  const [newStory, setNewStory] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [storyLink, setStoryLink] = useState(null)
  const [quote, setQuote] = useState(null)

  const uploadFile = (e) => {
    e.preventDefault()
    const uploadData = {
      src: URL.createObjectURL(e.target.files[0]),
      type: e.target.files[0].type.startsWith('image/') ? 'img' : 'video',
    }
    console.log(e.target.files[0].type)
    setFileUpload(uploadData)
  }

  const addNewStory = () => {
    const findedChat = StoryData.find((chat) => chat.id == userId)

    if (!quote) {
      findedChat.stories.push({ ...fileUpload, ...addContent, ...storyLink })
    } else {
      findedChat.stories.push({ ...quote })
    }
    close()
    setAddContent(null)
    setAddText(null)
    setFileUpload(null)
    setStoryLink(null)
    setQuote(null)
  }
  return (
    <>
      <Backdrop show={show} preview={true} close={() => close(false)} />
      <div
        className={`fixed top-0 left-0 w-full h-full z-30 ${
          show
            ? 'scale-100 opacity-100 translate-x-8'
            : 'scale-0 opacity-0 translate-x-0'
        } `}
      >
        {/* header */}
        <section className="flex items-center justify-end  w-11/12 mx-auto py-5 my-3">
          {/* right */}
          <div className="flex items-center gap-x-4 relative ">
            {fileUpload?.src && (
              <div className="flex items-center gap-7 px-6 py-2.5 border dark:border-gray-500/40 rounded-xl z-10 border-gray-300">
                <button onClick={() => setAddText(true)}>
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7zM7 8.89c3.15-1.57 6.85-1.57 10 0M12 16.3V7.93"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button onClick={() => setShowFormModal(true)}>
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18 16.02c-.76-.07-1.51-.42-2.09-1.03-1.32-1.39-1.32-3.67 0-5.06l2.19-2.3a3.307 3.307 0 014.82 0c1.32 1.39 1.32 3.67 0 5.06l-1.09 1.15"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.82 7.98c.76.07 1.51.42 2.09 1.03 1.32 1.39 1.32 3.67 0 5.06l-2.19 2.3a3.307 3.307 0 01-4.82 0c-1.32-1.39-1.32-3.67 0-5.06l1.09-1.15"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              className="btn btn-ghost btn-md mask mask-squircle min-h-[42px] h-4 "
              onClick={() => {
                close(false)
                setAddContent(null)
                setAddText(null)
                setFileUpload(null)
              }}
            >
              <IoCloseSharp size={22} color="#fff" />
            </button>
          </div>
        </section>

        {/* Start Story Content */}
        <section className="flex items-center justify-center -mt-4 relative">
          <div className="mockup-phone">
            <div className="camera h-3"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 relative">
                {/* content */}
                <div className="w-full h-full">
                  {!fileUpload?.src && !quote ? (
                    <div className="flex flex-col items-center gap-y-2 text-gray-400 h-full justify-center">
                      <svg
                        width={32}
                        height={32}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.76 22h10.48c2.76 0 3.86-1.69 3.99-3.75l.52-8.26A3.753 3.753 0 0018 6c-.61 0-1.17-.35-1.45-.89l-.72-1.45C15.37 2.75 14.17 2 13.15 2h-2.29c-1.03 0-2.23.75-2.69 1.66l-.72 1.45C7.17 5.65 6.61 6 6 6 3.83 6 2.11 7.83 2.25 9.99l.52 8.26C2.89 20.31 4 22 6.76 22zM10.5 8h3"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18c1.79 0 3.25-1.46 3.25-3.25S13.79 11.5 12 11.5s-3.25 1.46-3.25 3.25S10.21 18 12 18z"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="text-sm capitalize">share your story</p>
                    </div>
                  ) : (
                    <div className="relative h-full">
                      {!quote ? (
                        <StoryMedia
                          src={fileUpload.src}
                          type={fileUpload?.type}
                          content={addContent}
                        />
                      ) : (
                        <StoryMedia content={quote} isQuote={true} />
                      )}
                      {addText && (
                        <StoryEditor
                          addContent={setAddContent}
                          onHide={() => setAddText(false)}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-5 left-3 right-3 w-10/12 mx-auto flex items-center justify-between">
                  {!fileUpload?.src && !quote ? (
                    <>
                      <div className="relative">
                        <label
                          htmlFor="imgUpload"
                          className="flex items-center flex-col text-gray-300 gap-y-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9 10a2 2 0 100-4 2 2 0 000 4zM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9"
                            ></path>
                          </svg>
                          <p className="text-sm">Image</p>
                        </label>
                        <input
                          type="file"
                          id="imgUpload"
                          className="hidden"
                          onChange={uploadFile}
                        />
                      </div>
                      <div
                        className="flex items-center flex-col text-gray-300 gap-y-1"
                        onClick={() => setShowQuoteModal(true)}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58h3.22c1.42 0 2.58 1.16 2.58 2.58v5.8zM22 11.65c0 6.05-1.13 7.05-4.53 9.07M10.37 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58H7.8c1.42 0 2.58 1.16 2.58 2.58v5.8M10.37 11.65c0 6.05-1.13 7.05-4.53 9.07"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm">Quote</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      {!addText ? (
                        <button
                          className="btn btn-primary px-7 -ml-2"
                          onClick={addNewStory}
                        >
                          Upload
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Finish Story Content */}
      </div>
      {showFormModal && (
        <div className="z-[444] relative">
          <StoryForm
            show={showFormModal}
            close={setShowFormModal}
            isLink={true}
            setContent={setStoryLink}
          />
        </div>
      )}
      {showQuoteModal && (
        <div className="z-[444] relative">
          <StoryForm
            show={showQuoteModal}
            close={setShowQuoteModal}
            isLink={false}
            setContent={setQuote}
          />
        </div>
      )}
    </>
  )
}

export default StoryCreator

const StoryMedia = ({ src, type, content, isQuote }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isQuote && type === 'img' && (
        <img
          src={src}
          // onLoad={handleOnLoad}
          alt=""
          className={`w-full h-auto object-cover py-3 `}
        />
      )}
      {!isQuote && type === 'video' && (
        <video
          autoPlay
          playsInline
          className="h-auto w-full  aspect-video"
          // ref={videoRef}
          // onLoadedMetadata={(e) => {
          //   setDuration(e.target.duration)
          // }}
        >
          <source src={src} />
        </video>
      )}
      {!isQuote && content && (
        <div className="absolute bottom-4 left-0 right-0  w-full flex items-center justify-center">
          <p
            style={{ fontSize: content?.fontSize, color: content?.color }}
            className=" w-fit min-w-[110px] bg-slate-700/40 max-h-[150px] text-center px-5 py-2.5  rounded-xl text-white backdrop-blur"
          >
            {content?.description}
          </p>
        </div>
      )}
      {isQuote && (
        <div data-color="orange" className="w-full h-full p-4">
          <div className=" border-2 relative rounded-xl w-full h-[80%] mt-8">
            <p className="absolute -top-6 right-6 grid place-items-center py-2 px-3  bg-[#F97919] rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M22 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58h3.22c1.42 0 2.58 1.16 2.58 2.58v5.8zM22 11.65c0 6.05-1.13 7.05-4.53 9.07M10.37 11.65h-5.8c-1.53 0-2.58-1.16-2.58-2.58V5.85c0-1.42 1.05-2.58 2.58-2.58H7.8c1.42 0 2.58 1.16 2.58 2.58v5.8M10.37 11.65c0 6.05-1.13 7.05-4.53 9.07"
                ></path>
              </svg>
            </p>
            <p className="text-white font-bold text-xl flex items-center justify-center h-full">
              {content.quoteText}
            </p>
            <p className="absolute -bottom-4 left-6 bg-[#FCC93D] py-2 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2 12.35h5.8c1.53 0 2.58 1.16 2.58 2.58v3.22c0 1.42-1.05 2.58-2.58 2.58H4.58C3.16 20.73 2 19.57 2 18.15v-5.8M2 12.35C2 6.3 3.13 5.3 6.53 3.28M13.63 12.35h5.8c1.53 0 2.58 1.16 2.58 2.58v3.22c0 1.42-1.05 2.58-2.58 2.58h-3.22c-1.42 0-2.58-1.16-2.58-2.58v-5.8M13.63 12.35c0-6.05 1.13-7.05 4.53-9.07"
                ></path>
              </svg>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
