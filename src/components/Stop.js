import React from 'react';
import { ListItem, Typography } from "@material-ui/core";

function Stop({ stop }) {
    return (
        <ListItem style={{ display: "flex" }}>
            <Typography
                variant="body1"
            >{stop.stopName}
            </Typography>
            
        </ListItem>
    )
}