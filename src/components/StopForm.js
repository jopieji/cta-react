// temporary form to enter stops before I change
// to new screen to add stops

import React, { useState } from 'react';
import { v4 } from "uuid";
import { Button, TextField } from "@material-ui/core";
import { Form } from "react-bootstrap";


function StopForm({ addStop, updateLine, line }) {

    const [stop, setStop] = useState({
        id: "",
        stopName: "",
        stopID: "",
        stopLine: ""
    });

    function handleStopInputChange(e) {
        setStop( {...stop, stopName: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (stop.stopName.trim()) {
            addStop({ ...stop, id: v4() });
            setStop({ ...stop, stopName:"" , stopID:"", stopLine:""});
        }
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
                onChange={ (e) => {
                    updateLine(e.target.value);
                }}
                style={{ color: "#1c87c9", border: "0px", padding: "7px" }}
            >
                <option value="red">Red</option>
                <option value="brown">Brown</option> 
            </Form.Control>
   
        </form>
    );
}

export default StopForm;