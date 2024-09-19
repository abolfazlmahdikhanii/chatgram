import { createContext, useEffect, useState } from "react";

export const UserContext=createContext()

export const UserProvider=({children})=>{
  const storedUser = localStorage.getItem('profile');
    const [user,setUser]=useState(storedUser?JSON.parse(localStorage.getItem('profile')):[])

    useEffect(() => {
       
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
       
      }, [setUser,storedUser]);
    
      return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
}