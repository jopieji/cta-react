import './App.css';
import React, { useEffect, useState } from 'react';

// Material UI 
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

// components
import StopList from './components/StopList';
import StopForm from './components/StopForm';
import GithubFooter from "./components/GithubFooter";

const LOCAL_STORAGE_KEY = 'cta-stop-list-stops';

function App() {

  const [ stops, setStops ] = useState([]);
  const [ time, setTime ] = useState([]);
  // need line both in stopForm and stop
  const [ line, setLine ] = useState("red");
  // state for refresh button; need in stopForm
  const [ refresh, setRefresh ] = useState(true);

  useEffect(() => {
    const storageStops = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageStops) {
      setStops(storageStops);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stops));
  }, [stops]);

  function addStop(stop) {
    setStops([stop, ...stops]);
  }

  function removeStop(id) {
    setStops(stops.filter(stop => stop.id !== id));
  }

  // might switch to useRef later if broken
  function updateLine(val) {
    setLine(val);
  }

  function setTimeState() {
    let tag = " AM";
    let d = new Date();
    let hours = d.getHours();
    if (hours > 12) {
      hours = hours - 12;
      tag = " PM";
    }
    let mins = d.getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    let time = hours + ":" + mins + tag;
    setTime(time);
  }

  function toggleRefresh() {
    console.log(refresh);
    setRefresh(refresh === true ? false : true);
    console.log(refresh);
  }


  return (
    <div className="App">
      <Typography 
        style={{ padding: 12, color: "#054988" }} 
        variant="h2">
          CTA Train Tracker
      </Typography>
      <div>
        <Typography
          style={{ padding: 5, color: "red", justifyContent: "left", display:"inline-flex" }}
          variant="h5"
        >
          Last Request: {time}
        </Typography>
        <Button type="submit"
            style={{ padding: 5, color: "#054988", display:"inline-flex" }}
            onClick={toggleRefresh}
        >
          Refresh
        </Button>
      </div>
      <StopForm 
        addStop={addStop}
        updateLine={updateLine}
        line={line}
        toggleRefresh={toggleRefresh}
      />
      <StopList
        stops={stops}
        refresh={refresh}
        line={line}
        removeStop={removeStop}
        setTimeState={setTimeState}
      />
      <GithubFooter />
    </div>
  );
}

export default App;
