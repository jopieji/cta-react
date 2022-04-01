import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';

import trainStops from "../stopData";

function Stop({ stop, stops, removeStop, setTimeState }) {

    console.log(trainStops);

    const stopIDN = trainStops['trainStops'][stop.stopLine][stop.stopName.toLowerCase()][0];
    const stopIDS = trainStops['trainStops'][stop.stopLine][stop.stopName.toLowerCase()][1];
    console.log(stopIDN);
    console.log(stopIDS);
    /*
    THIS IS ALL BROKEN
    try {
        stop.stopID = trainStops[stop.stopLine][stop.stopName.toLowerCase()][0];
    } catch {
        console.log("North stop doesn't exist");
        // remove stop if North doesn't exist because every stop
        // has at least 1 location
        //removeStop(stop.id);
    }

    try {
        stop.stopIDS = trainStops[stop.stopLine][stop.stopName.toLowerCase()][1];
    } catch {
        console.log("South stop doesn't exist");
    }
    */

    // state for API calls
    // using these to store minutes
    const [ trainData, setTrainData ] = useState(null);
    const [ southTrainData, setSouthTrainData ] = useState(null);

    // function to remove a stop
    function handleRemoveClick() {
        removeStop(stop.id);
    }

    // calculates minutes to arrival
    const calcMins = (res) => {
        // get base times, HH:MM
        let arrival = res.data.data.ctatt.eta[0].arrT.substring(11, 16);
        let request = res.data.data.ctatt.tmst.substring(11, 16);

        // parse hours and minutes for both arrival and request time
        let hoursArrival = Number(arrival.substring(0, 2));
        let minsArrival = Number(arrival.substring(3, 5));

        let hoursRequest = Number(request.substring(0, 2));
        let minsRequest = Number(request.substring(3, 5));

        // calculate total minutes in each time (from midnight/start of day)
        let totMinsArrival = (hoursArrival * 60) + minsArrival;
        let totMinsRequest = (hoursRequest * 60) + minsRequest;

        // difference in minutes
        const result = totMinsArrival - totMinsRequest;

        // if 0 minutes, return "Approaching..."
        if (result < 1) {
            return "Approaching...";
        } else {
            return result + " minutes";
        }
    }

    // useEffect to update the time when component mounts;
    // need to check if it isMounted before updating state in useEffect()
    useEffect(() => {

        const getTrainDataFromExpress = (stopIDN) => {
            Axios.get(`/train/${stopIDN}`)
                .then(
                    (response) => {
                        // set mins to arrival
                        setTrainData(calcMins(response));
                    }
                )
                .catch(err => {
                    console.log(err);
            });
        }

        // easier to do south data in separate function
        const getSouthTrainDataFromExpress = (stopIDS) => {
            //console.log(stopIDS);
            // "https://cta-api-heroku.herokuapp.com"
            Axios.get(`/train/${stopIDS}`)
                .then(
                    (response) => {
                        // set mins to arrival
                        setSouthTrainData(calcMins(response));
                    }
                )
                .catch(err => {
                    console.log(err);
                    setSouthTrainData("N/A");
            });
        }

        // might need to define functions within the useEffect
        async function setData() {
            await getTrainDataFromExpress(stopIDN);
            await getSouthTrainDataFromExpress(stopIDS);
        }
        setData();
        setTimeState();
        
    }, [stops]);

    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="h6"
                style={{ color: stop.stopLine, textDecoration: "bold" }}
            >
                {stop.stopName}
            </Typography>
            
            <Typography
                variant="body2"
                style={{marginLeft: 15}}
            >
                Northbound Arrival: {trainData}<br/>
                Southbound Arrival: {southTrainData}<br/>
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;