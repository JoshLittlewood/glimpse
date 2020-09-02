import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
const ENDPOINT = "http://localhost:4001";

import Table from "../components/Table";
import Button from "../components/Button";
import { Stats, Stat } from "../components/Stat";

function App() {
  const [init, setInit] = useState("");
  const [calls, setCalls] = useState([
    "/home",
    "/something",
    "something a bit longer",
  ]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("init", (data) => {
      setInit(data);
    });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    socket.on("foo", (data) => {
      console.log("***", data);
      setCalls((prevState) => [...prevState, data]);
    });
  }, []);

  return (
    <>
      <p>Connection message: {init}</p>
      <Stats>
        <Stat>
          # of Calls: <b>{calls.length}</b>
        </Stat>
        <Stat>
          min response time: <b>1.10s</b>
        </Stat>
        <Stat>
          max response time: <b>4.37s</b>
        </Stat>
      </Stats>
      <Table calls={calls} />
      {!!calls.length && (
        <Button style={{ marginTop: "20px" }} onClick={() => setCalls([])}>
          Clear tables
        </Button>
      )}
    </>
  );
}

export default App;
