import React, { useEffect, useState } from 'react';
import { FcDocument } from 'react-icons/fc';
import decodeMessage from '../../Utility/decodeMessage';
import { supabase } from '../../superbase';

const MessageItemContent = ({ message }) => {
  const isArrayMessage = Array.isArray(message?.content);
  const content = isArrayMessage ? message?.content[message.content.length - 1] : message?.content;
  const decodedContent = decodeMessage(content);

  const getMessageContent = () => {
    switch (message?.messageType) {
      case 'img':
        return <ImgContent img={decodedContent} />;
      case 'video':
        return <VideoContent video={decodedContent} />;
      case 'file':
        return <FileContent file={decodedContent} />;
      case 'mp3':
      case 'audio/webm':
        return <FileContent title="Audio" />;
      default:
        return null;
    }
  };

  return (
    <>
      {message?.messageType === 'text' || !decodedContent ? (
        <TextContent txt={decodedContent} />
      ) : (
        <div className="flex items-center gap-2" dir="auto" >
          {getMessageContent()}
        </div>
      )}
    </>
  );
};

const TextContent = ({ txt }) => {
  const isImageTag = txt?.includes('<img src="data');
  return !isImageTag ? (
    <p
      className="dark:text-gray-400 text-[13px] truncate max-w-[190px] w-full text-gray-500"
      dir="auto"
      dangerouslySetInnerHTML={{ __html: txt }}
      title={txt}
    ></p>
  ) : (
    'media'
  );
};

const ImgContent = ({ img }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (img) fetchImage(img);
  }, [img]);

  const fetchImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('uploads').createSignedUrl(path, 120);
      if (error) throw error;
      setUrl(data.signedUrl);
    } catch (error) {
      console.error('Image fetch error:', error.message);
    }
  };

  return (
    <>
      <img className="w-4 h-4 rounded object-cover" src={url} alt="Image content" />
      <p className="text-sm" >Album</p>
    </>
  );
};

const VideoContent = ({ video }) => (
  <>
    <video className="w-4 h-4 object-cover rounded" controls>
      <source src={video} />
    </video>
    <p className="text-sm">Album</p>
  </>
);

const FileContent = ({ file, title }) => (
  <>
    <FcDocument />
    <p className="text-xs w-[100px] truncate">{file?.name || title}</p>
  </>
);

export default MessageItemContent;
