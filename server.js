// require express; basically an import
const express = require("express");

// require config file
const config = require("./config.js");

// require dotenv
require('dotenv');

// our access to express
const app = express();

// trying to troubleshoot disappearing page
/*
const { resolve } = require("path");

app.use(express.static("public"));

app.get("*", (req, res) => res.sendFile(resolve("public", "index.html")));
*/

// api key for TT API
// not working quite properly yet, but its okay
const key = config.TT_API_KEY;

// fix CORS issue
const cors = require('cors');

// this allows calls from localhost:3000
// fireship CORS video for context
app.use(cors({ origin: 'http://localhost:3000'}));

app.get('/', (req, res) => {
    res.send({ trying: "my best" });
});

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
    res.json({ test: 123 });
});

// env test
app.get('/envTest', (req, res) => {
    res.json({ key: key });
});

/*
    // express test
    const expressTest = () => {
        Axios.get('/express_backend').then(
            (response) => {
                console.log(response);
            }
        )
    }
*/