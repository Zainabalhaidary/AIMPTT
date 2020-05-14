import moment from "moment";
import { StackActions, NavigationActions } from "react-navigation";
import NotificationServiceInstance from '../NotificationService';
// import { TODAY_PRAYERS_EXAMPLE } from "../Constants";
import store from '../store';
import { getTodayPrayer, getTomorrowPrayer } from "../actions";
import { APP_DATA } from "../Constants";

//returns todays date
export const getTodaysDate = () => moment().format('YYYY-MM-DD');
//returns tomorrows date
export const getTomorrowsDate = () => moment().add('days', 1).format('YYYY-MM-DD');
//Returns the city name from city id
export const getCityName = (cityId) => {
    switch (cityId) {
        case 1:
            return "Birmingham";
        case 2:
            return "Brighton";
        case 3:
            return "Cardiff";
        case 4:
            return "Glasgow";
        case 5:
            return "Hull";
        case 6:
            return "Leeds";
        case 7:
            return "Liverpool";
        case 8:
            return "London";
        case 9:
            return "Manchester";
        case 10:
            return "Norwich";
        case 11:
            return "Plymouth";
        case 12:
            return "Portsmouth";
        case 13:
            return "Sheffield";
        case 14:
            return "Southampton";
        case 15:
            return "Swansea";
        default:
            return "London";
    }
};
//get the (current) month start date
export const getMonthStartDate = (month = moment().format('M')) => {
    return moment([moment().year(), month]).format('YYYY-MM-DD');
};

//get the current month end date
export const getMonthEndDate = (month = moment().format('M')) => {
    return moment(getMonthStartDate(month)).endOf('month').format('YYYY-MM-DD');
};

//Return notification type name
export const getNotificationTypeName = (type) => {
    switch (type) {
        case 0:
            return "Silent";
        case 1:
            return "Vibrate";
        case 2:
            return "Sound";
    }
};
//Return event name
export const getEventName = (eventID) => {
    switch (eventID) {
        case 0:
            return "Imsak";
        case 1:
            return "Dawn";
        case 2:
            return "Sunrise";
        case 3:
            return "Noon";
        case 4:
            return "Sunset";
        case 5:
            return "Maghrib";
        case 6:
            return "Midnight";
        default:
            return "";
    }
};

//this function resets the navigation stack
export const resetNavigation = (navigation, screen) => {
    //start of reset navigation stack
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen })],
    });
    navigation.dispatch(resetAction);
    //end of reset navigation stack
};
//this method returns whether a certain time falls in a certain range
export const isBetween = (time, startOfRange, endOfRange) => {
    //console.log("time " + time + " startOfRange " + startOfRange + " endOfRange " + endOfRange);
    var format = 'HH:mm';
    // var time = moment() gives you current time. no format required.
    var time = moment(time, format),
        beforeTime = moment(startOfRange, format),
        afterTime = moment(endOfRange, format);
    if (time.isBetween(beforeTime, afterTime, null, '[]')) {
        //console.log("in between");
        return true;
    }
    return false;
};
//iterates through times and generates notifications
export const generateNotifications = (cancelPreviousAlrams = false) => {
    // NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), "generateNotifications", "generateNotifications", APP_DATA);
    //update data if redundant
    updateData()
        .then(() => {
            // NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), "passed update data", "passed update data", APP_DATA);

            const { todaysPrayers, notificationTimes } = store.getState().app;
            //let todaysPrayers = TODAY_PRAYERS_EXAMPLE;
            //let tomorrowsPrayers = TODAY_PRAYERS_EXAMPLE;
            let eventsArr = ["Imsak", "Sunrise", "Sunset", "Midnight"];
            let prayersArr = ["Dawn", "Noon", "Maghrib"];
            let times = notificationTimes.map(notifTimeId => (getEventName(notifTimeId)));
            // console.log("selected times array " + JSON.stringify(times));
            let format = 'HH:mm';
            let timeStart = moment().format("HH:mm");
            let timeEnd = moment(timeStart, format).add(16, 'minutes').format(format);
            // if (cancelPreviousAlrams) {
            //     NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), "cancelPreviousAlrams", "cancel all", APP_DATA);
            //     NotificationServiceInstance.cancelAll();
            // }
            Object.keys(todaysPrayers).map((key) => {
                if (times.includes(key)) {
                    if (isBetween(todaysPrayers[key].slice(0, -3), timeStart, timeEnd)) {
                        if (eventsArr.includes(key)) {
                            // console.log("regular event");
                            scheculeNotif(store.getState().app, key, false);
                        }
                        else if (prayersArr.includes(key)) {
                            // console.log("prayer event");
                            let delay = getTimeDiff(todaysPrayers[key].slice(0, -3), timeEnd);
                            scheculeNotif(store.getState().app, key, true, delay);
                        }
                    }
                }
            });
        })
        .catch((err) => { console.log(err); });
    return Promise.resolve(null);
};
//schedules the next events notfication
export const scheculeNotif = (appData, currentEventKey, scheduleNext, delay) => {
    const { todaysPrayers, tomorrowsPrayers } = appData;
    // let todaysPrayers = TODAY_PRAYERS_EXAMPLE;
    // let tomorrowsPrayers = TODAY_PRAYERS_EXAMPLE;
    // console.log("schedule notif");
    if (scheduleNext) {
        // console.log("show pinned next");
        let nextEvent = getNextPrayer(todaysPrayers, tomorrowsPrayers, currentEventKey);
        //NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), "cancel all in " + delay, "cancel all", APP_DATA);
        //setTimeout(NotificationServiceInstance.cancelAll(), delay);
        NotificationServiceInstance.scheduleEvent(true, todaysPrayers[currentEventKey], nextEvent.key + " " + nextEvent.value, "Next Prayer", appData);//next prayer pinned alarm
        NotificationServiceInstance.scheduleEvent(false, todaysPrayers[currentEventKey], currentEventKey + " " + todaysPrayers[currentEventKey], "Athan", appData);//current prayer unpinned alarm
    }
    else {
        // console.log("not pinned");
        NotificationServiceInstance.scheduleEvent(false, todaysPrayers[currentEventKey], currentEventKey + " " + todaysPrayers[currentEventKey], "Alarm", appData);
    }
};
//get Todays date at a certain Time
export const getDateWithTime = (time, day = moment()) => {
    var format = 'HH:mm:ss';
    var time = moment(time, format);
    let date = new Date(
        day.get('year'),
        day.get('month'),
        day.get('date'),
        time.get('hour'),
        time.get('minute'),
        time.get('second'),
        time.get('millisecond'));
    return date;
};
//gets the next prayer's time
export const getNextPrayer = (obj, obj2, key) => {
    let prayersArr = ["Dawn", "Noon", "Maghrib"];
    let keys = Object.keys(obj);
    let nextEventIndex = keys.indexOf(key) + 1;
    let nextEventKey = keys[nextEventIndex];
    if (!nextEventKey) {
        return { key: "Dawn", value: obj2.Dawn };
    }
    if (prayersArr.includes(nextEventKey)) {
        return { key: nextEventKey, value: obj[nextEventKey] };
    }
    return getNextPrayer(obj, obj2, nextEventKey);
};
//gets the latest data from the api if data is outdated
export const updateData = () => {
    let p = new Promise(async (resolve, reject) => {
        if (!store.getState().app.todaysPrayers || store.getState().app.todaysPrayers.Date !== getTodaysDate() || store.getState().app.todaysPrayers.City != store.getState().app.city) {
            try {
                await store.dispatch(getTodayPrayer());
                await store.dispatch(getTomorrowPrayer());
            } catch (e) {
                reject('Error fetching prayers');
            }
        }
        resolve();
    });
    return p;
};
//gets the time difference between two times in milliseconds
export const getTimeDiff = (start, end) => {
    return moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss"), "millisecond");
};
//schedules the next prayer based on current time
export const scheduleNextPrayer = (appData, forceUpdate = false, cancelAll = true) => {
    //Should only be used when the app is fired for the first time
    // if (!store.getState().app.todaysPrayers || forceUpdate) {
    // NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), "scheduleNextPrayer", "scheduleNextPrayer", APP_DATA);
    //update data if redundant
    updateData()
        .then(() => {
            //if (cancelAll) {
            //NotificationServiceInstance.cancelAll();
            //}
            appData = !appData ? store.getState().app : appData;
            const { todaysPrayers, tomorrowsPrayers, notificationTimes } = appData;
            let prayersArr = ["Dawn", "Noon", "Maghrib"];
            let times = notificationTimes.map(notifTimeId => (getEventName(notifTimeId)));
            let timeStart = moment().format("HH:mm");
            let min = Number.MAX_VALUE;
            let prayerName = null;
            let prayerTime = null;
            Object.keys(todaysPrayers).map((key) => {
                if (times.includes(key)) {
                    if (prayersArr.includes(key)) {
                        let delay = getTimeDiff(timeStart, todaysPrayers[key].slice(0, -3));
                        if (delay > 0 && delay < min) {
                            min = delay;
                            prayerName = key;
                            prayerTime = todaysPrayers[prayerName];
                        }
                    }
                }
            });
            if (!prayerName) {
                prayerName = "Dawn";
                prayerTime = tomorrowsPrayers[prayerName];
            }
            NotificationServiceInstance.localNotification(true, moment().format("HH:mm"), prayerName + " " + prayerTime, "Next Prayer", appData);
            return prayerName;
        })
        .catch((err) => { console.log(err); });
    // }
};

/// Render Date to string
export const getTimestamp = (date = new Date()) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
