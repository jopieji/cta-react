import React from 'react';

// components
import Stop from "./Stop";
import ErrorBoundary from "./ErrorBoundary";

// material ui
import { List } from "@material-ui/core";

// list of stopIDs for erroneous input handling
//import trainStops from "../stopData";

function StopList({ stops, removeStop, setTimeState, refresh }) {

    /* 
    This deletes stops I want too; not sure why
    useEffect(() => {
        for (let i = 0; i < stops.length; i++) {
            let st = stops[i];
            if (!trainStops['trainStops'][st.stopLine][st.stopName.toLowerCase()]) {
                removeStop(st.id);
            }
        }
    }, [stops])
    */

    return (
        <List>
            {stops.map(stop => (
                <ErrorBoundary
                    removeStop={removeStop}
                    stop={stop}
                    key={stop.id}
                    flag={true}
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