import React, { memo, useCallback, useMemo, useState } from 'react';
import Microlink from '@microlink/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinkPreview = ({ text }) => {
  const [hasError, setHasError] = useState(false);
  const urls = useMemo(() => text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g), [text]);
  const containsImage = useMemo(() => text.includes('<img src='), [text]);

  const renderTextWithUrls = useCallback(() => {
    if (urls && !containsImage) {
      return urls.reduce(
        (updatedText, url) =>
          updatedText.replace(
            url,
            `<a href="${url}" target="_blank" class="underline text-sm" rel="noreferrer noopener">${url}</a>`
          ),
        text
      );
    }
    return text;
  }, [urls, containsImage, text]);

  const handleMicrolinkError = () => {
    setHasError(true);
    toast.error('Failed to load link preview');
  };

  return (
    <>
      <ToastContainer />
      <div dangerouslySetInnerHTML={{ __html: renderTextWithUrls() }}></div>
      {!containsImage && urls && (
        hasError ? (
          <div className="text-sm text-gray-500 mt-2">Link preview failed to load.</div>
        ) : (
          <Microlink
            url={urls[0]}
            lazy={{ threshold: 0.5 }}
            className="min-w-[380px] h-[150px] mt-2 rounded-lg bg-transparent"
            dir="auto"
            onError={handleMicrolinkError}
          />
        )
      )}
    </>
  );
};

export default memo(LinkPreview);
