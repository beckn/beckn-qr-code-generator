import React, { useEffect } from 'react';

const LoadingOverlay = ({ message }) => {

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <iframe
            src="https://giphy.com/embed/NFbs20puOHq9y"
            width="240" // Adjust the width as needed
            height="240" // Adjust the height as needed
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        <div className="text-white font-semibold"> {/* Added font-semibold class */}
          {message}
          <span className="animate-pulse inline-block">
            <span className="custom-ellipsis">...</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
