import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';


function Stop({ stop, stops, removeStop, setTimeState, line }) {

    const trainStops = {
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
        },

        brownStops: {
            'kimball': [30249, 30250],
            'kedzie': [30225, 30226],
            'francisco': [30167, 30168],
            'rockwell': [30195, 30196],
            'western': [30283, 30284],
            'damen': [30018, 30019],
            'montrose': [30287, 30288],
            'irving park': [30281, 30282],
            'addison': [30277, 30278],
            'paulina': [30253, 30254],
            'southport': [30070, 30071],
            'belmont': [30257, 30258],
            'wellington': [30231, 30232],
            'diversey': [30103, 30104],
            'fullerton': [30235, 30236],
            'armitage': [30127, 20128],
            'sedgwick': [30155, 30156],
            'chicago': [30137, 30138],
            'merchandise mart': [30090, 30091],
            'clark/lake': [40380, 'S'],
            'state/lake': [30051, 'S'],
            'randolph/wabash': [0, 'S'],
            'madison/wabash': [0, 'S'],
            'adams/wabash': [30131, 'S'],
            'harold washington library': [30165, 'S'],
            'lasalle/van buren': [30030, 'S'],
            'quincy': [30008, 'S'],
            'washington/wabash': [30383, 'S'],
            'washington/wells': [30142, 'S']
        }
    }

    // try and implement multiple lines
    if (line === "red") {
        // basic exception handling for invalid inputs
        try {
            stop.stopID = trainStops['redStops'][stop.stopName.toLowerCase()][0];
        } catch {
            console.log("North stop doesn't exist");
            // remove stop if North doesn't exist because every stop
            // has at least 1 location
            removeStop(stop.id);
        }
        
        try {
            stop.stopIDS = trainStops['redStops'][stop.stopName.toLowerCase()][1];
        } catch {
            console.log("South stop doesn't exist");
        }  
    } else if (line === "brown") {
        // basic exception handling for invalid inputs
        try {
            stop.stopID = trainStops['brownStops'][stop.stopName.toLowerCase()][0];
        } catch {
            console.log("North stop doesn't exist");
            // remove stop if North doesn't exist because every stop
            // has at least 1 location
            removeStop(stop.id);
        }
        
        try {
            stop.stopIDS = trainStops['brownStops'][stop.stopName.toLowerCase()][1];
        } catch {
            console.log("South stop doesn't exist");
        }
    }
    
    


    // state for API calls
    // using these to store minutes
    const [ trainData, setTrainData ] = useState(null);
    const [ southTrainData, setSouthTrainData ] = useState(null);

    // function to remove a stop
    function handleRemoveClick() {
        removeStop(stop.id);
    }

    // function to calc mins
    const calcMins = (responseJson) => {
        //console.log(responseJson);
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

    // try and see if notifications can be passed down; set body to train coming


    // useEffect to update the time when component mounts;
    // need to check if it isMounted before updating state in useEffect()
    useEffect(() => {
        
        const getTrainDataFromExpress = (stopID) => {
            //console.log(stopID);
            Axios.get(`/train/${stopID}`)
                .then(
                    (response) => {
                        // set mins to arrival
                        setTrainData(calcMins(response) + " minutes");
                    }
                )
                .catch(err => {
                    console.log(err);
            });
        }

        // easier to do south data in separate function
        const getSouthTrainDataFromExpress = (stopIDS) => {
            //console.log(stopIDS);
            Axios.get(`/train/${stopIDS}`)
                .then(
                    (response) => {
                        // set mins to arrival
                        setSouthTrainData(calcMins(response) + " minutes");
                    }
                )
                .catch(err => {
                    console.log(err);
                    setSouthTrainData("N/A");
            });
        }

        // might need to define functions within the useEffect
        async function setData() {
            await getTrainDataFromExpress(stop.stopID);
            await getSouthTrainDataFromExpress(stop.stopIDS);
        }
        
        setData();
        setTimeState();
        
    }, [stops]);

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