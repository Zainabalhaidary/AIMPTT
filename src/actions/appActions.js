import { SAVE_APP_STATE, PRAYERS_HAS_ERRORED, PRAYERS_ARE_LOADING } from './types';
import { getPrayersApi, getPrayerApi } from '../utils/api';
import { getTomorrowsDate } from '../utils';

export const saveAppState = (item) => {
    return {
        type: SAVE_APP_STATE,
        payload: item,
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

export const getPrayers = () => {
    return (dispatch, getState) => {
        dispatch(prayersAreLoading(true));
        return getPrayersApi(getState().app.city)
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

