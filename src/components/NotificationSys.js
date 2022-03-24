import { NotificationsOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

function NotificationSys() {

    const [ s, setS ] = useState(false);

    const buttonTrigger = (s) => {
        s ? setS(false) : setS(true);
    }

    const showNotification = () => {
        const notif = new Notification("New message from jopie:", {
            body: "This is working!"
        });
    }

    if (Notification.permission === "granted") {
        showNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            console.log(permission);
        });
    }

    console.log(Notification.permission);

    useEffect(() => {
        showNotification();
    }, [s]);


    return (
        <div>
            <button onClick={buttonTrigger}>Click to test</button>
        </div>
    )
}

export default NotificationSys;