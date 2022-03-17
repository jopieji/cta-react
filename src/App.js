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

  useEffect(() => {
    const storageStops = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageStops) {
      setStops(storageStops);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stops));
  }, [stops]);

  /*
  const expressTest = () => {
    fetch('/envTest')
      .then(res => res.json())
      .then(data => console.log(data));
  }
  */

  function addStop(stop) {
    setStops([stop, ...stops]);
  }

  function removeStop(id) {
    setStops(stops.filter(stop => stop.id !== id));
  }


  return (
    <div className="App">
      <Typography 
        style={{ padding: 16, color: "#054988" }} 
        variant="h2">
          CTA Train Tracker
      </Typography>
      <StopForm addStop={addStop} />
      <StopList
        stops={stops}
        removeStop={removeStop}
      />
    </div>
  );
}

export default App;
