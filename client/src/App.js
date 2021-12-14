import React, { useEffect } from "react";
import "./App.css";
import Axios from "axios";
import ShowFiles from "./ShowFiles/ShowFiles";
import Upload from "./Upload/Upload";
import NavBar from "./NavBar/NavBar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Upload />
      <ShowFiles />
    </div>
  );
}

export default App;
