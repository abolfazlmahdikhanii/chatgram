

export  function strToByte(str) {

  
    return (
      '\\x' +
      Array.from(str)
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
   
  
}
