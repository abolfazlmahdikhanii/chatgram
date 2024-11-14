import React, { useEffect, useState } from 'react'
import { supabase } from '../../superbase'
import { toast } from 'react-toastify'
import { toastOptions } from '../../Utility/toastOption'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isEmailEnterWord, setIsEmailEnterWord] = useState(false)
  const [isOtpEnterWord, setIsOtpEnterWord] = useState(false)
  const [isNextPage, setIsNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [newCodeTime, setNewCodeTime] = useState(60)
  const [isValid, setIsValid] = useState(true);

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

  useEffect(() => {
    let interval = setInterval(() => {
      if (isNextPage) {
        setNewCodeTime((prev) => prev - 1)
        if (newCodeTime === 0) clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isNextPage, newCodeTime])

  const registerUser = async (e) => {
    
    e.preventDefault()
    if(!isValid) return false
    setIsLoading(true)
    setNewCodeTime(60)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })

      if (error) {
        throw Error('Check your email and try again')
      }

      setIsNextPage(true)
    } catch (error) {
      toast.error(error,toastOptions)
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

  

    } catch (error) {
      setError('invalid code')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-[100dvh] w-full mx-auto flex flex-col items-center auth-wrapper">
      {/* Header */}
      <div className="w-[200px] h-[200px] relative mb-5">
        <img
          src="./logo.png"
          alt=""
          className="md:w-[350px] md:h-[350px] w-[340px] h-[340px] object-cover absolute -top-6"
        />
      </div>
      <h4 className="dark:[color:#fff_!important] text-gray-800 text-[27px] md:text-3xl  font-bold ">
        {!isNextPage ? (
          'Sign in to Chatgram'
        ) : (
          <span className="flex items-center gap-4 ">
            <span className='md:w-full max-w-[260px] truncate'>

            {email}
            </span>

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsNextPage(false)}
              className="text-gray-400 transition-all duration-300 hover:text-white cursor-pointer z-10"
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
      <p className="dark:text-gray-300 text-[rgb(112,117,121)] text-lg mt-1.5 md:mt-2.5 font-semibold text-center">
        {!isNextPage ? (
          ' Please enter your email'
        ) : (
          <>
            <span className="text-center md:text-[16px] text-sm dark:text-gray-400 text-gray-500">
              We have sent you a message in Chatgram
            </span>
            <br />
            <span className="text-center text-[16px] md:text-[16px] text-sm dark:text-gray-400  text-gray-500">
              with the code
            </span>
          </>
        )}
      </p>

      {!isNextPage&& ? (
        <form className="md:w-[28%] mx-auto md:max-w-[360px] mt-16 w-10/12 ">
          <div className="relative w-full">
            <input
              type="text"
              className="  peer input-profile"
              id="email"
              dir="auto"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => {
              setEmail(e.target.value)
              setIsValid(emailRegex.test(e.target.value));
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
            disabled={email===""||!isValid||isLoading}
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
        <form className="md:w-[28%] mx-auto md:max-w-[360px] mt-16 w-10/12">
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
          {newCodeTime < 1 ? (
            <p className="text-sm text-blue-400 transition-all duration-300 hover:text-blue-300 cursor-pointer mt-6 mb-4 text-center" onClick={registerUser}>
              resend new code
            </p>
          ) : (
            <p className="text-sm dark:text-gray-300 text-gray-500  text-center mt-6 mb-4">
              <span className='text-indigo-500'>{newCodeTime} second</span> to request new code{' '}
            </p>
          )}
          <button
            className="btn w-full btn-primary mt-6 h-[56px] text-lg"
            onClick={handleVerifyOtp}
            disabled={otp==""}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default Auth
