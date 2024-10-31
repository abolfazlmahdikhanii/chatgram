export function strToByte(str) {
  // return (
  //   '\\x' +
  //   Array.from(str)
  //     .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
  //     .join('')
  // )

  return str
}

export const relativeTimeFormat = (date) => {
  
  if(!date) return
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const pastDate=new Date(date)

  const now = Date.now()
  const pastTimestamp = pastDate.getTime();
  const timeDifference = pastTimestamp - now
  const differenceInSeconds = Math.floor(timeDifference / 1000);
  const differenceInMinutes = -Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = -Math.floor(differenceInHours / 24);


 if(differenceInHours>0) {
    // If the difference is less than 1 day, show hours
    return rtf.format(-differenceInHours, 'hour') // Use negative for past time
  }
   else if(differenceInMinutes>0) {
  
    return rtf.format(-differenceInMinutes, 'minute') // Use negative for past time
  }
   else  {
 
    return "Just now" // Use negative for past time
  }
}
