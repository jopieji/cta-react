// temporary form to enter stops before I change
// to new screen to add stops

import React, { useState } from 'react';
import { v4 } from "uuid";
import { Button, TextField } from "@material-ui/core";

function StopForm({ addStop }) {

    const [stop, setStop] = useState({
        id: "",
        stopName: "",
    });

    function handleStopInputChange(e) {
        setStop( {...stop, stopName: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (stop.stopName.trim()) {
            addStop({ ...stop, id: v4() });
            setStop({ ...stop, stopName:"" });
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
            <Button type="submit">Submit</Button>    
        </form>
    );
}

export default StopForm;