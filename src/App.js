import './App.css';
import React, { useEffect, useState } from 'react';
// might need HashRouter if we get a blank white screen

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
  const [ exp, setExp ] = useState([]);

  useEffect(() => {
    const storageStops = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageStops) {
      setStops(storageStops);
    }
    const r = callBackendAPI();
    setExp(r);
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

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };


  return (
    <div className="App">
      <Typography style={{ padding: 16, color: "#054988" }} variant="h2">CTA Train Tracker</Typography>
      <StopForm addStop={addStop} />
      <StopList
        stops={stops}
        removeStop={removeStop}
      />
      <h1>{exp}</h1>
    </div>
  );
}

export default App;
