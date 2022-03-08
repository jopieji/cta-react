import React, { useEffect, useState } from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';


function Stop({ stop, removeStop, stops }) {

    const red = {
        north: {
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
                '47th': [302387, 30238],
                'garfield': [30223, 30224],
                '63rd': [30177, 30178],
                '69th': [30191, 30192],
                '79th': [30046, 30047],
                '87th': [30276, 30275],
                '95th/dan ryan': [30088, 30089]
        }
    }

    // gotta be a better way to set the stopID
    stop.stopID = red['north'][stop.stopName.toLowerCase()][0];

    // function to remove a stop
    function handleRemoveClick() {
        removeStop(stop.id);
    }

    // state for API calls
    const [ trainData, setTrainData ] = useState(null);

    // get train data function = test for now
    const getTrainUrl = (stop) => {
        console.log(stop.stopID);
        return `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=&stpid=${stop.stopID}&outputType=JSON`;
    }

    const getTrainData = (stop) => {
        const trainUrl = getTrainUrl(stop);
        Axios.get(trainUrl).then(
            (response) => {
                console.log(response);
                setTrainData(response.data.ctatt.eta[0].arrT.substring(11));
            }
            ).catch(err => {
                console.log(err);
            });
    }

    // useEFfect to update the time when component mounts;
    // says i need to include getTrainData and stop?
    useEffect(() => {
        getTrainData(stop);
    }, [stops, stop]);

    // function to retreive parsed time data
    // this breaks the whole app
    /*
    const parseTime = (res) => {
        return res.data.ctatt.eta[0].arrT.substring(11);
    }
    */

    // probably need to move the API logic into here; thus each element can have a unique URL
    // get stopID; red['north'][stop.stopName.toLowerCase()][0]

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
                Arrival: {trainData}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;