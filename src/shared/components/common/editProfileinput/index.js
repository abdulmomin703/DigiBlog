import React from "react";
import "./style.css";
function EditProfileInput(props) {
  return (
    <div className="input-container">
      <input {...props} />
    </div>
  );
}

export default EditProfileInput;
