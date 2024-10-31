const decodeMessage = (content,src) => {

  // Extract hexadecimal values using regular expression
  // Remove the leading '\\x' and split the string into pairs of hexadecimal values
  // const hexPairs = content?.slice(2).match(/.{1,2}/g) || []

  // Convert each pair of hexadecimal values to characters and join them
  // const text = hexPairs
  //   .map((hex) => String.fromCharCode(parseInt(hex, 16)))
  //   .join('')

  //   console.log(text);
  return content
}
export default decodeMessage
