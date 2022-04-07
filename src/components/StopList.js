import React from 'react';

// components
import Stop from "./Stop";
import ErrorBoundary from "./ErrorBoundary";

// material ui
import { List } from "@material-ui/core";

function StopList({ stops, removeStop, setTimeState, refresh }) {

    return (
        <List>
            {stops.map(stop => (
                <ErrorBoundary
                    removeStop={removeStop}
                    stop={stop}
                >
                <Stop
                    key={stop.id}
                    stop={stop}
                    removeStop={removeStop}
                    stops={stops}
                    setTimeState={setTimeState}
                    refresh={refresh}
                />
                </ErrorBoundary>
            ))}
        </List>
    )
}

export default StopList;