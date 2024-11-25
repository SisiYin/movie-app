import React, { useState } from 'react';
import './ShareButton.css'; 
const basicUrl = 'http://localhost:3000'
console.log(basicUrl)


const ShareButton = ({ isPublic, shareUrl, onGenerateUrl }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleGenerateUrl = () => {
    if (onGenerateUrl) {
      onGenerateUrl();
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(`${basicUrl}/share/${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div
      className="share-container"
      onMouseEnter={() => {
        setShowOptions(true);
        if (!shareUrl && isPublic) handleGenerateUrl();
      }}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button
        className="share-button"
        onClick={isPublic ? handleGenerateUrl : null}
        disabled={!isPublic}
        style={{
          backgroundColor: isPublic ? '#4CAF50' : '#ccc',
          cursor: isPublic ? 'pointer' : 'not-allowed',
        }}
      >
        <i className="fa fa-share-alt"></i> Share
      </button>

      {showOptions && shareUrl && (
        <div className="share-options">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-option"
          >
            <i className="fa fa-facebook"></i> Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Check%20this%20out!`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-option"
          >
            <i className="fa fa-twitter"></i> Twitter
          </a>
          <a
            href={`mailto:?subject=Check%20this%20out&body=${shareUrl}`}
            className="share-option"
          >
            <i className="fa fa-envelope"></i> Email
          </a>
          <button className="share-option" onClick={handleCopyLink}>
            <i className="fa fa-link"></i> Copy link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;


