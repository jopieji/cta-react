import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';


function Stop({ stop, removeStop }) {

    const red = {
        redStops: {
                'howard': [30173, 30174],
                'jarvis': [30227, 30228],
                'morse': [30020, 30021],
                'loyola': [30251, 30252],
                'granville': [30147, 30148],
                'thorndale': [30169, 30170],
                'bryn mawr': [30267, 30268],
                'berwyn': [30066, 30067],
                'argyle': [30229, 30230],
                'lawrence': [30149, 30150],
                'wilson': [30105, 30106],
                'sheridan': [30016, 30017],
                'addison': [30273, 30274],
                'belmont': [30255, 30256],
                'fullerton': [30233, 30234],
                'north/clybourn': [30125, 30126],
                'clark/division': [30121, 30122],
                'chicago': [30279, 30280],
                'grand': [30064, 30065],
                'lake': [30289, 30290],
                'monroe': [30211, 30212],
                'jackson': [30109, 30110],
                'harrison': [30285, 30286],
                'roosevelt': [30269, 30270],
                'cermak-chinatown': [30193, 30194],
                'sox-35th': [30036, 30037],
                '47th': [30237, 30238],
                'garfield': [30223, 30224],
                '63rd': [30177, 30178],
                '69th': [30191, 30192],
                '79th': [30046, 30047],
                '87th': [30276, 30275],
                '95th/dan ryan': [30088, 30089]
        }
    }

    // gotta be a better way to set the stopID
    stop.stopID = red['redStops'][stop.stopName.toLowerCase()][0];
    stop.stopIDS = red['redStops'][stop.stopName.toLowerCase()][1];

    // function to remove a stop
    function handleRemoveClick() {
        removeStop(stop.id);
    }

    // EXPRESS FOR NOW
    const getTrainDataFromExpress = (stopID) => {
        console.log(stopID);
        Axios.get(`/train/${stopID}`)
            .then(
                (response) => {
                    setRawTrainData(response);
                }
            )
            .then(
                () => {
                    setTrainData(calcMins(rawTrainData));
                }
            )
            .catch(err => {
                console.log(err);
        });
    }
    /*
    // useless rn
    const getMinsFromExpress = () => {
        //console.log(rawTrainData);
        if (rawTrainData != null) {
            const mins = calcMins(rawTrainData);
        }
        //setTrainData(mins);
    }
    */
   
    // state for API calls
    const [ trainData, setTrainData ] = useState(null);
    const [ southTrainData, setSouthTrainData ] = useState(null);
    // just want it working for 1 direction to start
    const [ rawTrainData, setRawTrainData ] = useState(null);
    const [ NTrainMins, setNTrainMins ] = useState(null);
    const [ STrainMins, setSTrainMins ] = useState(null);

    // might need to use a proper server to make requests
    // can create my own endpoint to make calls to, which
    // will take my stopIDs and then return the data I want
    // this could also lead to a natural progression into
    // including other lines
    // def going to make requests using Node and Express
    const api_key = "";

    // get train data function = test for now
    const getTrainUrl = (stop) => {
        //console.log(`${stop.stopname} : ${stop.stopID}`);
        return `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${api_key}&stpid=${stop.stopID}&outputType=JSON`;
    }

    const getSouthTrainUrl = (stop) => {
        //console.log(`${stop.stopname} : ${stop.stopID}`);
        return `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${api_key}&stpid=${stop.stopIDS}&outputType=JSON`;
    }

    // function to calc mins
    const calcMins = (responseJson) => {
        console.log(responseJson);
        //let hoursArrival = responseJson.data.ctatt.eta[0].arrT.substring(11, 13);

        // minute digits of arrival time
        let minsArrival = responseJson.data.data.ctatt.eta[0].arrT.substring(14, 16);
        // minute digits of request time
        let requestTimeMins = responseJson.data.data.ctatt.tmst.substring(14, 16);

        // obvious calculation to find mins to arrrival
        let arrivalMinutes = minsArrival - requestTimeMins;

        // if there is a change of hour between request and arrival, need to change the equation
        if (Math.abs(arrivalMinutes) > 40) {
            arrivalMinutes = minsArrival - requestTimeMins + 60;
        } /* implement if I can use conditional HTML rendering for 'minutes' after min number
            else if (arrivalMinutes === 0) {
            return "Approaching...";
        } */
        return arrivalMinutes;
    }


    // function to get northbound train data
    const getTrainData = (stop) => {
        const trainUrl = getTrainUrl(stop);
        Axios.get(trainUrl).then(
            (response) => {
                //console.log(response);
                //axiosExpress();
                const northMinutesToArrival = calcMins(response);
                setTrainData(northMinutesToArrival);
            }
            ).catch(err => {
                console.log(err);
            });
    }

    // current solution for getting southbound data; might just include both for now
    const getSouthTrainData = (stop) => {
        const southTrainUrl = getSouthTrainUrl(stop);
        Axios.get(southTrainUrl).then(
            (response) => {
                //console.log(response);
                const southMinutesToArrival = calcMins(response);
                setSouthTrainData(southMinutesToArrival);
            }
            ).catch(err => {
                console.log(err);
            });
    }

    // useEffect to update the time when component mounts;
    // need to check if it isMounted before updating state in useEffect()
    useEffect(() => {
        let isMounted = true;
        //getTrainData(stop);
        //getTrainDataFromExpress(stop.stopID);
        //getSouthTrainData(stop);
        getTrainDataFromExpress(stop.stopID);
        if (isMounted) {
            //setRawTrainData(trainJson);
            //getMinsFromExpress(rawTrainData);
        }
        // had stops, stop in this dependency array
        // chose to remove it
        return () => { isMounted = false };
    }, []);

    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="body1"
            >
                {stop.stopName}
            </Typography>
            
            <Typography
                variant="body2"
                style={{marginLeft: 15}}
            >
                Northbound Arrival: {trainData} minutes <br/>
                Southbound Arrival: {southTrainData} minutes <br/>
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;