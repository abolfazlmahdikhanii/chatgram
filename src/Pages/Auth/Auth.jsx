import React, { useState } from 'react'
import { supabase } from '../../superbase'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isEmailEnterWord, setIsEmailEnterWord] = useState(false)
  const [isOtpEnterWord, setIsOtpEnterWord] = useState(false)
  const [isNextPage, setIsNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })

      if (error) {
        throw error
      }

      setIsNextPage(true)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { session, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'magiclink',
      })
      if (error) throw error

      // location.reload()
     console.log(session);
    } catch (error) {
      setError('invalid code')
    } finally {
      setIsLoading(false)
    }
  }
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
        {!isNextPage ? (
          'Sign in to Chatgram'
        ) : (
          <span className="flex items-center gap-4">
            {email}

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsNextPage(false)}
              className="text-gray-400 transition-all duration-300 hover:text-white cursor-pointer"
            >
              <path
                d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 22H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </h4>
      <p className="dark:text-gray-300 text-[rgb(112,117,121)] text-lg mt-2 font-semibold text-center">
        {!isNextPage ? (
          ' Please enter your email'
        ) : (
          <>
            <span className="text-center text-[16px] text-gray-400">
              We have sent you a message in Chatgram
            </span>
            <br />
            <span className="text-center text-[16px] text-gray-400">
              with the code
            </span>
          </>
        )}
      </p>

      {!isNextPage ? (
        <form className="w-[28%] mx-auto max-w-[360px] mt-16">
          <div className="relative w-full">
            <input
              type="text"
              className="  peer input-profile"
              id="email"
              dir="auto"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                e.target.value !== ''
                  ? setIsEmailEnterWord(true)
                  : setIsEmailEnterWord(false)
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
              <span className="label-text font-semibold">
                Keep me signed in{' '}
              </span>
            </label>
          </div>
          <button
            className="btn w-full btn-primary mt-6 h-[56px] text-lg relative disabled:bg-[#5616C5]/50"
            onClick={registerUser}
            disabled={isLoading}
          >
            {!isLoading ? (
              'Next'
            ) : (
              <>
                <span>PLEASE WAIT...</span>
                <span className="loading loading-spinner w-[2rem] absolute right-4"></span>
              </>
            )}
          </button>
        </form>
      ) : (
        <form className="w-[28%] mx-auto max-w-[360px] mt-16">
          <div className="relative w-full">
            <input
              type="text"
              className={`  peer input-profile ${
                error ? 'border-red-600 dark:border-red-600 text-red-500 ' : ''
              }`}
              id="code"
              autoComplete="off"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value)
                e.target.value !== ''
                  ? setIsOtpEnterWord(true)
                  : setIsOtpEnterWord(false)
              }}
            />

            <label
              htmlFor="code"
              className={` lbl-focus  ${otp !== '' ? 'lbl-shown' : ''} ${
                error ? 'text-red-500' : ''
              }`}
            >
              {!error ? 'Code' : error}
            </label>
          </div>

          <button
            className="btn w-full btn-primary mt-6 h-[56px] text-lg"
            onClick={handleVerifyOtp}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default Auth
