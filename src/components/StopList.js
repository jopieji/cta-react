import React from 'react';

// components
import Stop from "./Stop";

// material ui
import { List } from "@material-ui/core";

function StopList({ stops, removeStop }) {

    return (
        <List>
            {stops.map(stop => (
                <Stop
                    key={stop.id}
                    stop={stop}
                    removeStop={removeStop}
                    stops={stops}
                />
            ))}
        </List>
    )
}

export default StopList;