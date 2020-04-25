import moment from "moment";
import { StackActions, NavigationActions } from "react-navigation";
import NotificationService from '../NotificationService';

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
    console.log("time " + time + " startOfRange " + startOfRange + " endOfRange " + endOfRange);
    var format = 'HH:mm';
    // var time = moment() gives you current time. no format required.
    var time = moment(time, format),
        beforeTime = moment(startOfRange, format),
        afterTime = moment(endOfRange, format);
    if (time.isBetween(beforeTime, afterTime)) {
        console.log("in between");
        return true;
    }
    return false;
};
//iterates through times and generates notifications
export const generateNotifications = (todaysPrayersObject, tomorrowsPrayersObject) => {
    let eventsArr = ["Imsak", "Sunrise", "Sunset", "Midnight"];
    let prayersArr = ["Dawn", "Noon", "Maghrib"];
    let times = ["Imsak", "Dawn", "Sunrise", "Noon", "Sunset", "Maghrib", "Midnight"];
    let format = 'HH:mm';
    let timeStart = moment().format("HH:mm");
    let timeEnd = moment(timeStart, format).add(15, 'minutes').format(format);
    Object.keys(todaysPrayersObject).map((key) => {
        if (times.includes(key)) {
            if (isBetween(todaysPrayersObject[key].slice(0, -3), timeStart, timeEnd)) {
                if (eventsArr.includes(key)) {
                    console.log("regular event");
                    scheculeNotif(todaysPrayersObject, tomorrowsPrayersObject, key, false);
                }
                else if (prayersArr.includes(key)) {
                    console.log("prayer event");
                    scheculeNotif(todaysPrayersObject, tomorrowsPrayersObject, key, true);
                }
            }
        }
    });
};
//schedules the next events notfication
export const scheculeNotif = (obj, obj2, currentEventKey, scheduleNext) => {
    console.log("schedule notif");
    let notificationService = new NotificationService();
    if (scheduleNext) {
        console.log("show pinned next");
        let nextEventKey = getNextPrayer(obj, obj2, currentEventKey);
        notificationService.cancelAll();
        // notificationService.cancelNotif(JSON.stringify(getDateWithTime(obj[currentEventKey])));
        notificationService.scheduleEvent(true, obj[currentEventKey], currentEventKey, obj[nextEventKey], nextEventKey);
        notificationService.scheduleEvent(false, obj[currentEventKey], currentEventKey);
    }
    else {
        console.log("not pinned");
        notificationService.scheduleEvent(false, obj[currentEventKey], currentEventKey);
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
    return getNextPrayer(obj, nextEventKey, obj2);
};


