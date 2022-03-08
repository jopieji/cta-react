import React, { useEffect, useState } from 'react';

// components
import Stop from "./Stop";

// material ui
import { List } from "@material-ui/core";

// axios import
import Axios from "axios";

function StopList({ stops, removeStop }) {

    // state for API calls
    const [ trainData, setTrainData ] = useState(null);

    // can use maybe the time as a dependency? And update the time
    // every minute?
    // right now the dependency is the stop list
    useEffect(() => {
        // maybe best to put this in a function
        Axios.get(trainUrl).then(
            (response) => {
                console.log(response);
                setTrainData(response.data.ctatt.eta[0].arrT.substring(11));
            }
            ).catch(err => {
                console.log(err);
            });
    }, [stops]);

    // need to install access control allow origin extension
    const trainUrl = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=&stpid=30125&outputType=JSON";

    return (
        <List>
            {stops.map(stop => (
                <Stop
                    key={stop.id}
                    stop={stop}
                    removeStop={removeStop}
                    minsToArr={trainData}
                />
            ))}
        </List>
    )
}

export default StopList;