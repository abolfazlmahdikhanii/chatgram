import React, { useState } from 'react'
import isURL from 'validator/lib/isURL'
import { AiOutlineClose } from 'react-icons/ai'
import Backdrop from '../Backdrop/Backdrop'
const StoryForm = ({ show, close, isLink, setContent }) => {
  const [link, setLink] = useState('')
  const [quoteText, setQuoteText] = useState('')
  const [linkTitle, setLinkTitle] = useState('')
  const [isLinkValid, setIsLinkValid] = useState(true)

  const addStoryLink = (e) => {
    e.preventDefault()
    if (isURL(link)) {
      setIsLinkValid(true)
      setLink((prev) => `http://${prev}`)
      if (!linkTitle) {
        setContent({ link: link })
      } else {
        setContent({
          link: link,
          linkTitle: linkTitle,
        })
      }

      close(false)
    } else {
      setIsLinkValid(false)
    }
  }

  const addStoryQuote = (e) => {
    e.preventDefault()
    setContent({
      quoteText: quoteText,
      type: 'img',
      isQuote: true,
    })
    close(false)
  }

  return (
    <>
      <Backdrop show={show} />
      <dialog
        id="my_modal_1"
        className={`modal modal-box modal-bottom sm:modal-middle  justify-items-start [overflow-y:hidden] px-0 max-h-[700px] -translate-x-1/2 left-1/2 pt-0 mt-0 h-fit top-1/2 -translate-y-1/2 overflow-x-hidden ${
          show ? 'pointer-events-auto visible opacity-100' : ''
        }`}
      >
        <div className="flex items-center gap-5 px-6 pb-4 w-full pt-7">
          <button
            className="btn btn-sm btn-square   grid place-items-center"
            onClick={() => close(false)}
          >
            <AiOutlineClose size={16} />
          </button>
          <p className="text-2xl font-semibold dark:text-white capitalize text-gray-800 ">
            {isLink ? 'Add Link' : 'Add Quote'}
          </p>
        </div>

        <div className="modal-body  h-full ">
          {/* body */}
          {isLink ? (
            <form className="  w-full  flex flex-col gap-2.5 px-3">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Link</span>
                </div>
                <input
                  type="text"
                  placeholder="http://chatgram.com"
                  className="input input-bordered w-full "
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value)
                    isURL(e.target.value)
                      ? setIsLinkValid(true)
                      : setIsLinkValid(false)
                  }}
                />
                {link.length && !isLinkValid ? (
                  <div className="label mt-1">
                    <span className="label-text-alt text-error">
                      Link is not verify
                    </span>
                  </div>
                ) : null}
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Link Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Please Enter Link Title"
                  className="input input-bordered w-full "
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                />
              </label>

              <div className="mt-6 w-full">
                <button
                  className="btn  btn-primary w-full h-[56px]"
                  disabled={!link.length ? 'disabled' : false}
                  onClick={addStoryLink}
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <form className="  w-full  flex flex-col gap-2.5 px-3">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Your Quote</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-[160px]"
                  placeholder="Quote"
                  value={quoteText}
                  
                  onChange={(e) => setQuoteText(e.target.value)}
                ></textarea>
                <div className="label mt-2">
                {quoteText.length>280?<span className="label-text-alt text-error">quote text should be 280 character</span>:null}
                  <span className="label-text-alt">
                    {quoteText.length} / 280
                  </span>
                </div>
              </label>

              <div className="mt-6 w-full">
                <button
                  className="btn  btn-primary w-full h-[56px]"
                  disabled={
                    quoteText.length < 0 || quoteText.length > 280
                      ? 'disabled'
                      : false
                  }
                  onClick={addStoryQuote}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  )
}

export default StoryForm
