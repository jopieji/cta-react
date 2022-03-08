import React from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


function Stop({ stop, removeStop, minsToArr }) {

    function handleRemoveClick() {
        removeStop(stop.id);
    }


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
                Arrival: {minsToArr}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;