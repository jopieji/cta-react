import React from 'react';

// components
import Stop from "./Stop";

// material ui
import { List } from "@material-ui/core";

function StopList({ stops, removeStop, setTimeState, Notification }) {

    return (
        <List>
            {stops.map(stop => (
                <Stop
                    key={stop.id}
                    stop={stop}
                    removeStop={removeStop}
                    stops={stops}
                    setTimeState={setTimeState}
                    notif={Notification}
                />
            ))}
        </List>
    )
}

export default StopList;