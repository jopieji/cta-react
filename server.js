// require express; basically an import
const express = require("express");
const axios = require('axios');

// require config file
const config = require("./src/config.js");

// require dotenv
/*
require('dotenv');
*/

// our access to express
const app = express();
// BEG OF SHOWING PAGE ON SERVER
//app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/
// END OF SHOWING PAGE ON SERVER

// api key for TT API
// not working quite properly yet, but its okay
const key = config.TT_API_KEY;

// fix CORS issue
const cors = require('cors');
//const { default: axios } = require("axios");

// this allows calls from localhost:3000
// fireship CORS video for context
app.use(cors({ origin: 'http://localhost:3000'}));

//show that server is up and running
app.listen(config.PORT, config.HOST, () => {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

// creating a GET route
app.get('/express_backend', (req, res) => {
    res.status(200).send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
// Can check if working: http://localhost:5000/express_backend

// test
app.get('/api', (req, res) => {
    console.log(getTrainUrl());
    //res.json({ trainURL: getTrainUrl() });
});

// env test
app.get('/envTest', (req, res) => {
    res.json({ key: key });
});

app.get('/train/:stopID', (req, res) => {
    const stpID = req.params.stopID;
    const currUrl = `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${key}&stpid=${stpID}&outputType=JSON`;
    axios.get(currUrl).then(
        (response) => {
            console.log(response);
            // need to send response.data, not just response
            // can just send data, then parse on the client side
            res.status(200).send({ data: response.data });
        }
        ).catch(err => {
            console.log(err);
        });
});

// function to construct URL
// test for now; can't change stop
// will change stop based on API request from client using params /call/:stopId
const getTrainUrl = () => {
    //console.log(`${stop.stopname} : ${stop.stopID}`);
    return `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${key}&stpid=30251&outputType=JSON`;
}

// function to make call to TT API base
/*
const getTrainData = (trainUrl) => {
    //const trainUrl = getTrainUrl(stop);
    axios.get(trainUrl).then(
        (response) => {
            console.log(response);
            //axiosExpress();
            //const mTA = calcMins(response);
            //setTrainData(northMinutesToArrival);
            return response;
        }
        ).catch(err => {
            console.log(err);
        });
}

// function to calc mins
const calcMins = (responseJson) => {
    //let hoursArrival = responseJson.data.ctatt.eta[0].arrT.substring(11, 13);

    // minute digits of arrival time
    let minsArrival = responseJson.data.ctatt.eta[0].arrT.substring(14, 16);
    // minute digits of request time
    let requestTimeMins = responseJson.data.ctatt.tmst.substring(14, 16);

    // obvious calculation to find mins to arrrival
    let arrivalMinutes = minsArrival - requestTimeMins;

    // if there is a change of hour between request and arrival, need to change the equation
    if (Math.abs(arrivalMinutes) > 40) {
        arrivalMinutes = minsArrival - requestTimeMins + 60
    } /* implement if I can use conditional HTML rendering for 'minutes' after min number
        else if (arrivalMinutes === 0) {
        return "Approaching...";
    } 
    return arrivalMinutes;
}
*/