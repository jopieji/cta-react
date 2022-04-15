// temporary form to enter stops before I change
// to new screen to add stops

import React, { useState } from 'react';
import { v4 } from "uuid";
import { Button, TextField } from "@material-ui/core";
import { Form } from "react-bootstrap";


// list of stopIDs for erroneous input handling
import trainStops from "../stopData";

function StopForm({ addStop, updateLine, line }) {

    const redKeys = trainStops['trainStops']['red'];
    const brownKeys = trainStops['trainStops']['brown'];

    const [ field, setField ] = useState();

    const [stop, setStop] = useState({
        id: "",
        stopName: "",
        stopLine: "",
        fieldVal: ""
    });

    // need to update both name and stopLine on input change to make line correct
    function handleStopInputChange(e) {
        setStop( {...stop, stopName: e.target.value, stopLine: line, fieldVal: e.target.value});
    }

    function handleSubmit(e) {
        const keys = stop.stopLine === "red" ? redKeys : brownKeys;
        e.preventDefault();
        if (!keys[stop.stopName.toLowerCase()]) {
            console.log("Invalid stop name");
            setStop({...stop, fieldVal: ""});
            return;
        }
        
        if (stop.stopName.trim()) {
            addStop({ ...stop, id: v4()});
            setStop({ ...stop, stopLine: line, fieldVal: "" });
        }
        stop.stopName = "";
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
                value={stop.fieldVal}
                onChange={handleStopInputChange}
            />
            <Button type="submit"
                style={{color: "#e60000"}}
            >Submit</Button>
            <Form.Control
                as="select"
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