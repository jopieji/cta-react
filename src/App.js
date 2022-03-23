import './App.css';
import React, { useEffect, useState } from 'react';

// Material UI 
import Typography from "@material-ui/core/Typography";

import StopList from './components/StopList';
import StopForm from './components/StopForm';

// probably want components for:
// the List of Stops: StopList
// the individual Stops: Stop
// maybe for the time

// going to need views for adding adding
// maybe one for each line

const LOCAL_STORAGE_KEY = 'cta-stop-list-stops';

function App() {

  const [ stops, setStops ] = useState([]);
  const [ time, setTime ] = useState([]);

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

  function setTimeState() {
    let tag = " AM";
    let d = new Date();
    let hours = d.getHours();
    if (hours > 12) {
      hours = hours - 12;
      tag = " PM";
    }
    let time = hours + ":" + d.getMinutes() + tag;
    setTime(time);
  }

  useEffect(() => {
    Notification.requestPermission();
  });


  return (
    <div className="App">
      <Typography 
        style={{ padding: 16, color: "#054988" }} 
        variant="h2">
          CTA Train Tracker
      </Typography>
      <Typography
        style={{ padding: 5, color: "red", justifyContent: "left"}}
        variant="h5"
      >
        Last Request: {time}
      </Typography>
      <StopForm addStop={addStop} />
      <StopList
        stops={stops}
        notif={Notification}
        removeStop={removeStop}
        setTimeState={setTimeState}
      />
      
    </div>
  );
}

export default App;
