// temporary form to enter stops before I change
// to new screen to add stops

import React, { useState } from 'react';
import { v4 } from "uuid";
import { Button, TextField } from "@material-ui/core";
import { Form } from "react-bootstrap";

import trainStops from "../stopData.js";


function StopForm({ addStop, updateLine, line }) {

    const stopDict = trainStops;

    function getStopID(stop) {
        return [stopDict[line][stop.stopName][0], stopDict[line][stop.stopName][1]];
    }

    const [stop, setStop] = useState({
        id: "",
        stopName: "",
        stopID: [],
        stopLine: ""
    });

    function handleStopInputChange(e) {
        setStop( {...stop, stopName: e.target.value, stopID: getStopID(), stopLine:line});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (stop.stopName.trim()) {
            setStop({ ...stop, stopID: getStopID(stop), stopLine:line});
            addStop({ ...stop, id: v4()});
        }
    }

    function lineSwitch(e) {
        updateLine(e.target.value);
    }

    return (
        <form className="stop-form" onSubmit={handleSubmit}>
            <TextField 
                label="Stop"
                name="stopName"
                type="text"
                value={stop.stopName}
                onChange={handleStopInputChange}
            />
            <Button type="submit"
                style={{color: "#e60000"}}
            >Submit</Button>
            <Form.Control
                as="select"
                custom
                onChange={lineSwitch}
                style={{ color: "#1c87c9", border: "0px", padding: "7px" }}
            >
                <option value="red">Red</option>
                <option value="brown">Brown</option> 
            </Form.Control>
   
        </form>
    );
}

export default StopForm;