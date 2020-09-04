import React, { useState, useEffect , useMemo} from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
const ENDPOINT = "http://localhost:3001";

import Table from "../components/Table";
import Button from "../components/Button";
import { Stats, Stat } from "../components/Stat";

function App() {
  const [init, setInit] = useState("");
  const [calls, setCalls] = useState([]);
  const [response, setResponse] = useState("");

  let maxResTime = '-';
  let minResTime = '-';

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
  
  useMemo(() => {
    maxResTime = !!calls.length ? Math.max.apply(Math, calls.map(function(c) { return c.resTime; })) : '-';
    minResTime = !!calls.length ? Math.min.apply(Math, calls.map(function(c) { return c.resTime; })) : '-';
  }, [calls])
  

  return (
    <>
      <p>Connection message: {init}</p>
      <Stats>
        <Stat>
          # of Calls: <b>{calls.length}</b>
        </Stat>
        <Stat>
          min response time: <b>{minResTime} ms</b>
        </Stat>
        <Stat>
          max response time: <b>{maxResTime} ms</b>
        </Stat>
      </Stats>
      <Table calls={calls} />
      {!!calls.length && (
        <>
          <Button style={{ marginTop: "20px" }} onClick={() => setCalls([])}>
            Clear table
          </Button>
        </>
      )}
    </>
  );
}

export default App;