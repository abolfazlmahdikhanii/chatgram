import React, { useContext, useState } from 'react'
import { ChatContext } from '../../../Context/ChatContext'
import { supabase } from '../../../superbase'

const SearchBar = ({ activeSearch, setActiveSearch }) => {
  const { setSearchChat, searchChat,setSearchText,setSearchLoading } = useContext(ChatContext)
  const [search,setSearch]=useState('')
  const searchFriendHandler = async (e) => {
    try {
      const val=e.target.value.trim()
      setSearchLoading(true)
      let { data: users, error } = await supabase
      .from('users')
      .select('*')
      .or(`username.ilike.%${val}%,email.ilike.%${val}%`);
      if (error) throw Error
      setSearchChat(users)
      setSearchLoading(false)
    } catch (error) {
      console.log(error)
    }
    finally{
      setSearchLoading(false)
    }
  }
  const showAllUserHandler = async () => {
    try {
      setSearchLoading(true)
      let { data: users, error } = await supabase
      .from('users')
      .select('*')
      
      if (error) throw Error
      setSearchChat(users)
      setSearchLoading(false)
    } catch (error) {
      console.log(error)
    }
    finally{
      setSearchLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2 w-full relative mb-5 mt-1">
      <button
        className={`btn btn-ghost mask mask-squircle btn-sm transition-all duration-100  ${
          activeSearch ? 'static opacity-100  ' : ' opacity-0  absolute  '
        }`}
        onClick={() => {
          setActiveSearch(false)
          setSearchChat([])
          setSearch('')
        }}
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 12H3.67004"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`flex items-center justify-between bg-base-300/70 pr-3.5 rounded-xl  mx-1  transition-all duration-300 border  ${
          activeSearch
            ? 'w-[100%] border border-primary'
            : 'w-full border-transparent'
        }`}
        onClick={() => {
          setActiveSearch(true)
          showAllUserHandler()
        }}
      >
        <input
          type="text"
          className=" py-2.5 pl-4 w-full bg-transparent focus-visible:outline-none dark:text-white dark:placeholder:text-gray-500 placeholder:text-sm text-gray-800 placeholder:text-gray-600"
          placeholder="Search..."
          value={search}
          dir='auto'
          onChange={(e) => {
            setSearch(e.target.value.trim())
            setSearchText(e.target.value.trim())
            searchFriendHandler(e)
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          className={`text-gray-400 ml-1.5 transition-all duration-300 ${
            activeSearch ? 'text-primary' : ''
          }`}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19zM22 22l-2-2"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
