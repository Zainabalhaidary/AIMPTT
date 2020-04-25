import PushNotification from 'react-native-push-notification';
import { getDateWithTime } from './utils';

export default class NotificationService {
    //onNotificaitn is a function passed in that is to be called when a
    //notification is to be emitted.
    constructor(onNotification) {
        this.configure(onNotification);
        // this.lastId = 0;
    }

    configure(onNotification) {
        console.log("configuring onNotif");
        PushNotification.configure({
            onNotification: onNotification,

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            popInitialNotification: true,
        });
    }

    //Appears right away
    localNotification(time, eventName) {
        console.log("showing instatnt pinned notification at " + date);
        // this.lastId++;
        let date = getDateWithTime(time);
        PushNotification.localNotification({
            id: date.getTime(),
            title: "Next Prayer",
            message: eventName + " " + time,
            playSound: false,
            soundName: 'default',
            ongoing: true
        });
    }

    //Appears after a specified time. App does not have to be open.
    scheduleEvent(ongoing, time, eventName, nextPrayerTime, nextPrayerTitle) {
        console.log("ongoing " + ongoing + " nextPrayerTitle " + nextPrayerTitle);
        // this.lastId++;
        let date = getDateWithTime(time);
        console.log("scheduling notification at " + date);
        PushNotification.localNotificationSchedule({
            id: date.getTime(),
            date: date,
            title: ongoing ? "Next Prayer" : "Current Prayer",
            message: !ongoing ? (eventName + " " + time) : (nextPrayerTitle + " " + nextPrayerTime),
            playSound: true,
            soundName: 'default',
            ongoing: ongoing
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }

    cancelNotif(id) {
        PushNotification.cancelLocalNotifications({ id: '' + id });
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }
}
