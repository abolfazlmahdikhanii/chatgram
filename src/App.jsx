import React, { useEffect } from 'react'
import Layout from './Components/Layout/Layout'
import useChangeThem from './CustomHooks/useChangeThem'

const App = () => {
  const [them,setThem]=useChangeThem('light')
  useEffect(()=>{
   setThem(localStorage.getItem('them'))
  },[])
  return (
    <div>
      <Layout/>
    </div>
  )
}

export default App