import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [isEnterWord, setIsEnterWord] = useState(false)
  return (
    <div className="h-full w-full mx-auto flex flex-col items-center auth-wrapper">
      {/* Header */}
      <div className="w-[200px] h-[200px] relative mb-5">
        <img
          src="../../../src/assets/images/logo.png"
          alt=""
          className="w-[350px] h-[350px] object-cover absolute -top-6"
        />
      </div>
      <h4 className="dark:[color:#fff_!important] text-gray-800 text-3xl  font-bold ">
        Sign in to Chatgram
      </h4>
      <p className="dark:text-gray-300 text-[rgb(112,117,121)] text-lg mt-2 font-semibold">
        Please enter your email
      </p>
      <form className="w-[28%] mx-auto max-w-[360px] mt-16">
        <div className="relative w-full">
          <input
            type="text"
            className="  peer input-profile"
            id="email"
            dir="auto"
            onChange={(e) => {
              setEmail(e.target.value)
              e.target.value !== ''
                ? setIsEnterWord(true)
                : setIsEnterWord(false)
            }}
          />

          <label
            htmlFor="email"
            className={` lbl-focus  ${email !== '' ? 'lbl-shown' : ''}`}
          >
            Email
          </label>
        </div>
        <div className="form-control my-5 mx-3">
          <label className="label cursor-pointer justify-start gap-x-7">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
            <span className="label-text font-semibold">Keep me signed in </span>
          </label>
        </div>
        <button className="btn w-full btn-primary mt-6 h-[56px] text-lg">Next</button>
      </form>
    </div>
  )
}

export default Auth
