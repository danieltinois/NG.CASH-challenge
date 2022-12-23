import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  const [username, setUsername] = useState<string>("");

  const onGetUsername = (nomeUsuario: string) => {
    setUsername(nomeUsuario);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={<Login onGetUsername={onGetUsername} />}
        />
        <Route path="/homepage" element={<HomePage nomeUsuario={username} />} />
        <Route
          path="/register"
          index
          element={<Register onGetUsername={onGetUsername} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
