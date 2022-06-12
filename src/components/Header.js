import React from "react";
import logo from "../static/icons/logo.svg";
import openseaLogo from "../static/icons/simple-icons_opensea.svg";
import Button from "./Button";
export default function Header() {
  return (
    <header>
      <a href="https://lands.town" target="_blank">
        <div className="logo">
          <img src={logo} />
          <div className="logo-text">
            <p>The</p>
            <h2>Landscape</h2>
          </div>
        </div>
      </a>
      <a
        href="https://opensea.io/collection/the-landscape-digital-real-estate"
        rel="noopener noreferrer"
        target={"_blank"}
      >
        <Button text={"Opensea"} icon={openseaLogo} />
      </a>
    </header>
  );
}
