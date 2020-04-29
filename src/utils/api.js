import * as axios from 'axios';
import { BASE_API_URL, TECH_DIFFICULTY_MSG, NETWORK_CONNECTION_MSG } from '../Constants';
import { getTodaysDate } from '.';
import NotificationServiceInstance from '../NotificationService';

var instance = axios.create();
instance.defaults.baseURL = BASE_API_URL;
instance.defaults.timeout = 20000;

//function that gets all the prayers for the current month
export const getPrayersApi = (city, monthStart, monthEnd) => {
    return instance.get("read_by_date_range.php?Date1=\"" + monthStart + "\"&Date2=\"" + monthEnd + "\"&City=" + city)
        .then((resp) => {
            return resp.data;
        }).catch(err => {
            throw new Error(err);
        });
};

//function that gets all the prayers for the current day
export const getPrayerApi = (city, date = getTodaysDate()) => {
    NotificationServiceInstance.localNotification("I am fetching data right now");
    return new Promise((resolve, reject) => {
        instance.get("read_single.php?Date=\"" + date + "\"&City=" + city)
            .then((resp) => {
                if (resp.data.Imsak) {
                    resolve(resp.data);
                }
                else {
                    reject(TECH_DIFFICULTY_MSG);
                }
            }).catch(err => {
                console.log(err);
                reject(NETWORK_CONNECTION_MSG);
            });
    });
};
