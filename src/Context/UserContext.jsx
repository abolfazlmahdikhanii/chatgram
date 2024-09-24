import { createContext, useEffect, useState } from "react";

export const UserContext=createContext()

export const UserProvider=({children})=>{
  const storedUser = localStorage.getItem('profile');
    const [user,setUser]=useState(storedUser?JSON.parse(localStorage.getItem('profile')):[])
    const [font, setFont] = useState(16)
    const [chatBg, setChatBg] = useState('')
    const [color, setColor] = useState('purple')
    useEffect(() => {
       
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
       
      }, [setUser,storedUser]);
    
      return (
        <UserContext.Provider value={{ user, setUser,font,setFont,chatBg,setChatBg,color,setColor }}>
          {children}
        </UserContext.Provider>
      );
}