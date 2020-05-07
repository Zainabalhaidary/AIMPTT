import { SAVE_APP_STATE, PRAYERS_HAS_ERRORED, PRAYERS_ARE_LOADING } from './types';
import { getPrayersApi, getPrayerApi } from '../utils/api';
import { getTomorrowsDate, generateNotifications, scheduleNextPrayer } from '../utils';

export const saveAppState = (item) => {
    return {
        type: SAVE_APP_STATE,
        payload: item,
    };
};

export const saveAppStateBroker = (item) => {
    return (dispatch, getState) => {
        let currApp = getState().app;
        dispatch(saveAppState(item));
        //if the city has been changed then fetch the new data
        if (!currApp.city !== item.city) {
            dispatch(getTodayPrayer());
            dispatch(getTomorrowPrayer());
        }
        //if any settings has changed, cancel old notifications and create new ones
        if (!currApp.city !== item.city ||
            currApp.notificationTypeSound !== item.notificationTypeSound ||
            currApp.notificationTypeVibrate !== item.notificationTypeVibrate ||
            currApp.notificationTimes !== item.notificationTimes ||
            currApp.pinned !== item.pinned
        ) {
            //cancel old alarms
            //check for new ones
            generateNotifications(true);
            if (currApp.pinned !== item.pinned) {
                if (item.pinned) {
                    scheduleNextPrayer(getState().app, true, false);
                }
            }
        }
    };
};


export const prayersHasErrored = (error) => {
    return {
        type: PRAYERS_HAS_ERRORED,
        payload: error
    };
};

export const prayersAreLoading = () => {
    return {
        type: PRAYERS_ARE_LOADING,
    };
};

export const getPrayers = (city, startDate, endDate) => {
    return (dispatch, getState) => {
        dispatch(prayersAreLoading(true));
        return getPrayersApi(city, startDate, endDate)
            .then(prayersArr => {
                dispatch(saveAppState({ ...getState().app, prayers: prayersArr }));
            }).catch(error => dispatch(prayersHasErrored(error)));
    };
};

export const getTodayPrayer = () => {
    return (dispatch, getState) => {
        dispatch(prayersAreLoading(true));
        return getPrayerApi(getState().app.city)
            .then(resp => {
                dispatch(saveAppState({ ...getState().app, todaysPrayers: resp }));
            }).catch(error => {
                dispatch(prayersHasErrored(error));
            }
            );
    };
};

export const getTomorrowPrayer = () => {
    return (dispatch, getState) => {
        dispatch(prayersAreLoading(true));
        return getPrayerApi(getState().app.city, getTomorrowsDate())
            .then(resp => {
                dispatch(saveAppState({ ...getState().app, tomorrowsPrayers: resp }));
            }).catch(error => dispatch(prayersHasErrored(error)));
    };
};

