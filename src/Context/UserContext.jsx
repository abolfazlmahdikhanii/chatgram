import { createContext, useEffect, useState } from "react";

export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('profile');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
}