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
        let onGoingFlag = appData.pinned ? ongoing : false;
        let date = getDateWithTime(time);
        PushNotification.localNotification({
            id: onGoingFlag ? 12121212 : date.getTime(),
            //date: date,
            title: title,
            message: subtitle,
            playSound: appData.notificationTypeSound ? true : false,
            vibrate: appData.notificationTypeVibrate ? true : false,
            soundName: 'default',
            ongoing: onGoingFlag,
            //-----------------------------------------------------
            priority: "max", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            importance: "max", // (optional) set notification importance, default: high
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        });
    }

    //Appears after a specified time. App does not have to be open.
    scheduleEvent(ongoing, time, subtitle, title, appData) {
        let onGoingFlag = appData.pinned ? ongoing : false;
        let date = getDateWithTime(time);
        PushNotification.localNotificationSchedule({
            id: onGoingFlag ? 12121212 : date.getTime(),
            date: date,
            title: title,
            message: subtitle,
            playSound: appData.notificationTypeSound ? true : false,
            vibrate: appData.notificationTypeVibrate ? true : false,
            soundName: 'default',
            ongoing: appData.pinned ? ongoing : false,
            //-----------------------------------------------------
            priority: "max", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            importance: "max", // (optional) set notification importance, default: high
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
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
