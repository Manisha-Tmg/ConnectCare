import React from "react";
import "../css/InputField.css";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div className="input-field">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-box"
      />
    </div>
  );
};

export default InputField;
