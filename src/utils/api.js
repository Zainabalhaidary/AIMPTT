import * as axios from 'axios';
import { BASE_API_URL } from '../Constants';
import { getTodaysDate } from '.';

var instance = axios.create();
instance.defaults.baseURL = BASE_API_URL;
instance.defaults.timeout = 20000;

//function that gets all the prayers for the current month
export const getPrayersApi = (city) => {
    let monthStart = null;
    let monthEnd = null;
    return instance.get("read_by_date_range.php?Date1=" + monthStart + "&Date2=" + monthEnd + "&City=" + city)
        .then((resp) => {
            return resp;
        }).catch(err => {
            throw new Error(err);
        });
};

//function that gets all the prayers for the current day
export const getPrayerApi = (city, date = getTodaysDate()) => {
    return instance.get("read_single.php?Date=\"" + date + "\"&City=" + city)
        .then((resp) => {
            return resp.data;
        }).catch(err => {
            throw new Error(err);
        });
};
