import './App.css';
import React, { useEffect, useState } from 'react';
// might need HashRouter if we get a blank white screen

// axios import
import Axios from "axios";

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

  function addStop(stop) {
    setStops([stop, ...stops]);
  }

  function removeStop(id) {
    setStops(stops.filter(stop => stop.id !== id));
  }

  // need to install access control allow origin extension
  const trainUrl = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=&stpid=30125&outputType=JSON";

  const getData = () => {
    Axios.get(trainUrl).then(
      (response) => {
        console.log(response);
      }
    ).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h2">CTA App</Typography>
      <StopForm addStop={addStop} />
      <StopList
        stops={stops}
        removeStop={removeStop}
      />
      <button onClick={getData}>Get CTA Data for Clybourn</button>
    </div>
  );
}

export default App;
