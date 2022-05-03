import React from "react";
import Button from "./Button";
import defaultImage from "../static/map/land-04x04.png";

import "../styles/select-dialog.css";

export default function Select({
  name = "Land-0001",
  size = "04x04",
  image = defaultImage,
  district = "One",
}) {
  return (
    <div className="dialog">
      <img src={image} />
      <div className="dialog-text">
        <h2>district {district}</h2>
        <p className="name">{name}</p>
        <p>Size: {size}</p>
      </div>
      <div className="dialog-action">
        <Button text="Buy" onClick={() => console.log("click")} />
      </div>
    </div>
  );
}
