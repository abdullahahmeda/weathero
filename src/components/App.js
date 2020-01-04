import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import Search from "./Search";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Footer />
    </div>
  );
};

render(<App />, document.getElementById("root"));
