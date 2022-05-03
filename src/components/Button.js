import React from "react";

export default function Button({ text, icon, onClick }) {
  return (
    <button className="primary-btn" onClick={onClick}>
      {!!icon && <img src={icon} />}
      {text}
    </button>
  );
}
