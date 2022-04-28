import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';

import trainStops from "../stopData";

function Stop({ stop, stops, removeStop, setTimeState, refresh, flag }) {

    // get stopID values for Northbound and Southbound Trains
    const stopIDN = trainStops['trainStops'][stop.stopLine][stop.stopName.toLowerCase()][0];
    const stopIDS = trainStops['trainStops'][stop.stopLine][stop.stopName.toLowerCase()][1];

    let destN = "";
    let destS = "";
    let colorOfText = "black";

    if (stop.stopLine === "red") {
        destN = "To Howard: ";
        destS = "To 95th/Dan Ryan: ";
        colorOfText = "red";
    } else if (stop.stopLine === "brown") {
        destN = "To Kimball: ";
        destS = "To Loop: ";
        colorOfText = "brown";
    } else if (stop.stopLine === "blue") {
        destN = "To Forest Park: ";
        destS = "To O'Hare: ";
        colorOfText = "#3a81ff";
    } else if (stop.stopLine === "orange") {
        destN = "To Loop: ";
        destS = "To Midway: ";
        colorOfText = "#ff821a";
    } else if (stop.stopLine === "pink") {
        destN = "To Loop: ";
        destS = "To 54th/Cermak: ";
        colorOfText = "#ff5df4";
    } else if (stop.stopLine === "purple") {
        destN = "To Linden: ";
        destS = "To Loop: ";
        colorOfText = "#6a24ff";
    } else if (stop.stopLine === "green") {
        destN = "To Harlem: ";
        destS = "To Ashland/63rd or Cottage Grove: ";
    }

    // state for API calls
    // using these to store minutes
    const [ trainData, setTrainData ] = useState(null);
    const [ southTrainData, setSouthTrainData ] = useState(null);

    // function to remove a stop
    function handleRemoveClick() {
        removeStop(stop.id);
    }

    function formatStopName() {
        let str = stop.stopName.toLowerCase();
        let ind = stop.stopName.search("/");
        if (ind != -1) {
            let ch = str.charAt(ind + 1).toUpperCase();
            str = str.substring(0, ind + 1) + ch + str.substring(ind + 2);
        }
        return str.charAt(0).toUpperCase() + str.substring(1);
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
            Axios.get(`https://cta-api-separate.herokuapp.com/train/${stopIDN}`)
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
            Axios.get(`https://cta-api-separate.herokuapp.com/train/${stopIDS}`)
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
        
    }, [stops, refresh]);

    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="h6"
                style={{ color: colorOfText, textDecoration: "bold" }}
            >
                {formatStopName()}
            </Typography>
            
            <Typography
                variant="body2"
                style={{marginLeft: 15}}
            >
                {destN} {trainData}<br/>
                {destS} {southTrainData}<br/>
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;