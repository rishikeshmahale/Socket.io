import React, { useEffect, useMemo, useState } from 'react';
import { io } from "socket.io-client";
import { Container, TextField, Typography, Button } from "@mui/material";

const App = () => {
  
  const [message, setMessage] = useState("")

  const socket = useMemo(() => io("http://localhost:3000/"), []);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    })

    return () => {
      socket.disconnect()
    }
    
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");

  }


  return (
    <Container maxWidth='sm'>
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket IO
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField onChange={(e) => setMessage(e.target.value)} id='outlined-basic' label="outlined" variant='outlined' />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>

    </Container>
  )
}

export default App
