import React, { useContext, useEffect, useState } from 'react'

import Layout from './Components/Layout/Layout'
import useChangeThem from './CustomHooks/useChangeThem'
import Auth from './Pages/Auth/Auth'
import { supabase } from './superbase'
import { UserContext, UserProvider } from './Context/UserContext'

const App = () => {
  const [them, setThem] = useChangeThem('light')
  const [session, setSession] = useState(null)
  let element = null
  useEffect(() => {
    setThem(localStorage.getItem('them'))
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(session)getProfile(session.user.id)
    })

    return () => subscription.unsubscribe()
  }, [])
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  element = !session ? <Auth /> : <Layout />

  return <UserProvider>{element}</UserProvider>
}

export default App
