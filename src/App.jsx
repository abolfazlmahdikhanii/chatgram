import React, { useContext, useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

import Layout from './Components/Layout/Layout'
import useChangeThem from './CustomHooks/useChangeThem'
import Auth from './Pages/Auth/Auth'
import { supabase } from './superbase'
import { UserContext, UserProvider } from './Context/UserContext'

const App = () => {
  const [them, setThem] = useChangeThem('light')
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let element = null
  useEffect(() => {
    setThem(localStorage.getItem('them'))
    setIsLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
 
    
      if (session) {
        setSession(session)
       
     
      }
      setTimeout(()=>{
        setIsLoading(false)
      },1000)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // setIsLoading(true)

      if (session) {
        setSession(session)
        getProfile(session?.user?.id)
      
      }
      setTimeout(()=>{
        setIsLoading(false)
      },1000)
    })

    return () => {
      subscription.unsubscribe()
     
    }
  }, [setSession])
  const getProfile = async (id) => {
    try {
      // Get user info
      const { data, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('userid', id)
        .single()
      if (profileError) {
        throw profileError
      } else {
        localStorage.setItem('profile', JSON.stringify(data))
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {

      element = (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="fixed top-1/2 left-1/2"
        />
      )
    }  else if(!session) {

      element =( <Auth />)
    }
 else  element = <Layout />

  return <UserProvider>{element}</UserProvider>
}

export default App
