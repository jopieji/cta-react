import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';

import trainStops from "../stopData";

function Stop({ stop, stops, removeStop, setTimeState }) {

    const TS = trainStops;

    // state for API calls
    // using these to store minutes
    const [ trainData, setTrainData ] = useState(null);
    const [ southTrainData, setSouthTrainData ] = useState(null);
    //const [ stopID, setStopID ] = useState(null);
    //const [ stopIDS, setStopIDS ] = useState(null);

    let topDest = "Northbound";
    let botDest = "Southbound";
    if (stop.stopLine === "red") { 
        topDest = "Howard";
        botDest = "95th/Dan Ryan";
    } else if (stop.stopLine === "brown") {
        topDest = "Kimball";
        botDest = "Loop";
    }
    // add more when lines are added

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
        let hoursArrival = arrival.substring(0, 2);
        let minsArrival = arrival.substring(3, 5);

        let hoursRequest = request.substring(0, 2);
        let minsRequest = request.substring(3, 5);

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
        
        console.log(stop.stopName);
        console.log(stop.stopLine);
        //let stopID = trainStops[stop.stopLine][stop.stopName.toLowerCase()][0];

        // some brown line stops have no second station
        //let stopIDS = trainStops[stop.stopLine][stop.stopName.toLowerCase()][1];


        const getTrainDataFromExpress = (stopID) => {
            //console.log(stop.stopID);
            Axios.get(`https://cta-api-heroku.herokuapp.com/train/${stopID}`)
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
            Axios.get(`https://cta-api-heroku.herokuapp.com/train/${stopIDS}`)
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
            await getTrainDataFromExpress(TS['red'][stop.stopName.toLowerCase()][0]);
            //await getSouthTrainDataFromExpress(stop.stopID[1]);
        }
        
        setData();
        setTimeState();
        
    }, [stops]);

    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="body1"
                style={{ color: stop.stopLine }}
            >
                {stop.stopName}
            </Typography>
            
            <Typography
                variant="body2"
                style={{marginLeft: 15}}
            >
                {topDest}: {trainData}<br/>
                {botDest}: {southTrainData}<br/>
                Line: {stop.stopLine}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;