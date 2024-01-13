import "./styles/App.css";

import React from "react";
import Board from "./components/Board";

const App = () => {
    return (
        <div className="app">
            <div className="header">Kanban board</div>
            <Board />
        </div>
    )
}

export default App;
