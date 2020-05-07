import PushNotification from 'react-native-push-notification';
import { getDateWithTime } from './utils';

class NotificationService {
    //onNotificaitn is a function passed in that is to be called when a
    //notification is to be emitted.
    constructor(onNotification) {
        this.configure(onNotification);
        // this.lastId = 0;
    }

    configure(onNotification) {
        //console.log("configuring onNotif");
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
    localNotification(ongoing, time, subtitle, title, appData) {
        // this.lastId++;
        let date = getDateWithTime(time);
        PushNotification.localNotification({
            id: date.getTime(),
            //date: date,
            title: title,
            message: subtitle,
            playSound: appData.notificationTypeSound ? true : false,
            vibrate: appData.notificationTypeVibrate ? true : false,
            soundName: 'default',
            ongoing: appData.pinned ? ongoing : false,
        });
    }

    //Appears after a specified time. App does not have to be open.
    scheduleEvent(ongoing, time, subtitle, title, appData) {
        // this.lastId++;
        let date = getDateWithTime(time);
        PushNotification.localNotificationSchedule({
            id: date.getTime(),
            date: date,
            title: title,
            message: subtitle,
            playSound: appData.notificationTypeSound ? true : false,
            vibrate: appData.notificationTypeVibrate ? true : false,
            soundName: 'default',
            ongoing: appData.pinned ? ongoing : false,
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

const NotificationServiceInstance = new NotificationService();
export default NotificationServiceInstance;
