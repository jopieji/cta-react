import React from 'react';
import { ListItem, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

function Stop({ stop, removeStop }) {

    function handleRemoveClick() {
        removeStop(stop.id);
    }

    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="body1"
            >{stop.stopName}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />    
            </IconButton>
        </ListItem>
    );
}

export default Stop;