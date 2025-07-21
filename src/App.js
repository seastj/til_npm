import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Bar from "./components/chart/Bar";
import Line from "./components/chart/Line";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route
          path="/bar"
          element={
            <h1>
              <Bar />
            </h1>
          }
        ></Route>
        <Route
          path="/line"
          element={
            <h1>
              <Line />
            </h1>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
