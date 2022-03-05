import './App.css';
import React, { useEffect, useState } from 'react';

// Material UI 
import Typography from "@material-ui/core/Typography";

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

  function addStop(stop) {
    setStops([stop, ...stops]);
  }

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h2">CTA App</Typography>
    </div>
  );
}

export default App;
