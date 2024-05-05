import React, { useEffect, useState } from 'react'
const getThemFromStorage=()=>{
    return localStorage.getItem('them')?localStorage.getItem('them'):dark
}

const useChangeThem = () => {

    const [them,setThem]=useState(()=>getThemFromStorage())
    
    
    useEffect(()=>{
        const root=window.document.documentElement
        if(them==='light'){
            root.classList.remove('dark')
            document.querySelector("html").setAttribute("data-theme", 'light');
            localStorage.setItem('them','light')
        }

        else{
            root.classList.add('dark')
            document.querySelector("html").setAttribute("data-theme", 'dark');

            localStorage.setItem('them','dark')
        }
        
    },[them])
  
    return [them,setThem]
}

export default useChangeThem