import React, { useEffect } from 'react';

function NotificationSys({ }) {

    const showNotification = () => {
        const notif = new Notification({
            body: "Hey its working!",
        });

        console.log(notif);
    }

    
    /*
    logic to check if notifications enabled
    if (!("Notification" in window)) {
        console.log("Notifications not available");
    } else {
        console.log(`Notifications enabled for ${stop.stopName}`);
    }
    */

    useEffect(() => {
        Notification.requestPermission();
    });


    return (
        <div>
            <button onClick={showNotification}>Click to show</button>
        </div>
    )
}

export default NotificationSys;