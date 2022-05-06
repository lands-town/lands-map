import React from "react";
import Header from "./Header";
import Hint from "./Hint";
import BuyDialog from "./BuyDialog";

export default function Layout({ children, select }) {
  return (
    <>
      <Header />
      {children}
      <Hint />
      {select && (
        <BuyDialog name={select.name} size={select.size} link={select.link} />
      )}
    </>
  );
}
