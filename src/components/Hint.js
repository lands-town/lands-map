import React from "react";
import leftClick from "../static/icons/left-click.svg";
import scroll from "../static/icons/scroll.svg";
import rightClick from "../static/icons/right-click.svg";
export default function Hint() {
  return (
    <ul className="hint">
      <li>
        <img src={leftClick} />
        Rotate
      </li>
      <li>
        <img src={scroll} />
        Zoom
      </li>
      <li>
        <img src={rightClick} />
        Move
      </li>
    </ul>
  );
}
