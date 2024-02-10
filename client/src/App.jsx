import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Container, TextField, Typography, Button, Stack } from "@mui/material";

const App = () => {
  const [message, setMessage] = useState("");

  const [room, setRoom] = useState("");

  const [socketId, setSocketId] = useState("");

  const [messages, setMessages] = useState([]);

  const socket = useMemo(() => io("http://localhost:3000/"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      socket.emit("receive-message", data);
      setMessage((messages) => [...messages, data])
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message , room});
    setMessage("");
  };

  return (
    <Container maxWidth="sm">

      <Typography variant="h2" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {
          messages.map((m, i) => (
            <Typography key={i} variant="h2" component="div" gutterBottom>
              {m}
            </Typography>
          ))
        }
      </Stack>


    </Container>
  );
};

export default App;
