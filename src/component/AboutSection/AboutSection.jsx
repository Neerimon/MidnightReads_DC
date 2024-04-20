import React from 'react';
import './AboutSection.css';

const AboutSection = ({ setAboutText }) => {
    const handleTextareaChange = (event) => {
      setAboutText(event.target.value);
    };
  
    return (
      <div className="section">
        <h2>About</h2>
        <div className="markdown-editor">
          <div className="about el-textarea">
            <textarea
              autoComplete="off"
              placeholder="A little about yourself..."
              className="el-textarea__inner"
              style={{ minHeight: '51px', height: '51px' }}
              onChange={handleTextareaChange}
            ></textarea>
          </div>
        </div>
      </div>
    );
  };
  

export default AboutSection;
