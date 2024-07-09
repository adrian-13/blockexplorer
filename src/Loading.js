import React from "react";
import "./Home.css"; // Ensure you are importing the correct CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <div class="loader"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loading;
