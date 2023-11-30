import React from 'react'

const LinkPreview = ({text}) => {
  // const splitURl=url.split(' ')
  const urls = text.match(/\bhttps?:\/\/\S+/gi);

  const renderTextWithUrls = () => {
    let newText = text;
    if (urls) {
      urls.forEach((url) => {
        newText = newText.replace(url, `<a href="${url}" target="_blank" class="underline " rel='noreferrer noopener'>${url}</a>`);
      });
    }
 
    return newText;
      
  }


  return (
 
        <div dangerouslySetInnerHTML={{__html:renderTextWithUrls()}}></div>
  
  ) 
}

export default LinkPreview