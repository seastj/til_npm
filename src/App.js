import React from "react";
import Header from "./components/layout/Header";
import Schedule from "./pages/Schedule";
import Slide from "./pages/Slide";
import JoinPage from "./pages/JoinPage";
import CounterAtom from "./components/CounterAtom";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <CounterAtom />
      <TodoList />
    </div>
  );
}

export default App;
