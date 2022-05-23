import React from "react";
import Button from "./Button";

import "../styles/select-dialog.css";

export default function Select({ select, district = "One" }) {
  const { name, size, image, link, location, isPreview = false } = select;

  return (
    <div className="dialog">
      <img src={image} />
      <div className="dialog-text">
        <h4>Name: {name}</h4>
        <ul className="attributes">
          <li>District: {district}</li>
          <li>location: {location}</li>
          <li>Size: {size}</li>
        </ul>
      </div>
      <div className="dialog-action">
        {!isPreview && (
          <a href="#">
            <Button text="Buy" />
          </a>
        )}
      </div>
    </div>
  );
}
