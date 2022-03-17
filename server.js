// not going to use npm init right now
// might need to add "main": "server.js" to
// package.json

// require express; basically an import
const express = require("express");
// our access to express
const app = express();

const port = process.env.port || 5000;

//show that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// creating a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
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