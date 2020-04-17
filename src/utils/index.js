import moment from "moment";
import { StackActions, NavigationActions } from "react-navigation";
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
    return moment(getMonthStartDate(month + 1)).endOf('month').format('YYYY-MM-DD');
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
    }
};

//this function resets the navigation stack
export const resetNavigation = (navigation) => {
    //start of reset navigation stack
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
    });
    navigation.dispatch(resetAction);
    //end of reset navigation stack
  };

