import React from "react";

export default function Button({ text, icon }) {
  return (
    <button className="primary-btn">
      <img src={icon} />
      {text}
    </button>
  );
}
