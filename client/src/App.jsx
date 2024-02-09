import React, { useEffect } from 'react';
import { io } from "socket.io-client";

const App = () => {

  const socket = io("http://localhost:3000/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    })
  }, []);


  return (
    <div>
      App
    </div>
  )
}

export default App

// npm i @mui/material @emotion/react @emotion/styled
// npm i socket.io-client