// require express; basically an import
const express = require("express");
const axios = require('axios');
require("dotenv");

// require config file
const config = require("./config.js");

// also needs to be enabled for deployment
//const key = process.env.TT_API_KEY;

//for testing
const key = config.TT_API_KEY;

// need to change for deployment server to process.env
//console.log(`Listening on port ${config.PORT}`);
//console.log(`Host is ${config.HOST}`);

// our access to express
const app = express();
// BEG OF SHOWING PAGE ON SERVER
//app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});



// fix CORS issue
const cors = require('cors');
// cors config for deployment
/*
const corsOptions = {
    origin: "https://cta-react-heroku.herokuapp.com",
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));
app.options("*", cors());
*/
// this allows calls from localhost:3000
// fireship CORS video for context
app.use(cors({ origin: 'http://localhost:3000'}));

//show that server is up and running

app.listen(config.PORT, config.HOST, () => {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

// heroku config?
app.listen(config.PORT || 5000);

// creating a GET route
app.get('/express_backend', (req, res) => {
    res.status(200).send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
// Can check if working: http://localhost:5000/express_backend

// test
/*
app.get('/api', (req, res) => {
    console.log(getTrainUrl());
    //res.json({ trainURL: getTrainUrl() });
});
*/

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