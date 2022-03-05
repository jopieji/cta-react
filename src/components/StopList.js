import React from 'react';
import Stop from "./Stop";
import { List } from "@material-ui/core";

function StopList({ stops, removeStop }) {
    return (
        <List>
            {stops.map(stop => (
                <Stop
                    key={stop.id}
                    stop={stop}
                    removeStop={removeStop}
                />
            ))}
        </List>
    )
}

export default StopList;