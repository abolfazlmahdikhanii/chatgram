import React, { useEffect, useState } from 'react'
import { supabase } from '../superbase'
import { useParams } from 'react-router-dom'

const useTypingStatus = () => {
  const [typingUsers, setTypingUsers] = useState(null)
    const match=useParams()
  useEffect(() => {

    const subscription = supabase
      .channel(`typing_status`)
      .on('postgres_changes',{ event: '*', schema: 'public', table: 'typing_status' }, (payload) => {
    
        if (payload.new.is_typing) {
          setTypingUsers( payload.new.user_id)
        }
        else{
            setTypingUsers(null)
        }
        // } else {
        //   setTypingUsers((prev) =>
        //     prev.filter((id) => id !== payload.new.user_id)
        //   )
        // }
      })
      .subscribe()

    return () => {
  
    //   supabase.removeSubscription(subscription)
    }
  }, [match.id])
  return typingUsers
}

export default useTypingStatus
