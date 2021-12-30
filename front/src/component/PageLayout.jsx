import React from "react";
import Navbar from "./Navbar";

export default function PageLayout({ title, children }) {
  return (
    <div>
      <Navbar />
      <h1>{title}</h1>
      {children}
    </div>
  );
}
