import { SAVE_APP_STATE } from '../actions/types';
import { getTodaysDate } from '../utils';

const INITIAL_STATE = {
    city: 8,//london by default
    adjustment: 0,
    notificationType: 1, //0: silent/vibrationg, 1:azan
    eventType: null, //prayer/ non- prayer
    pinned: true,
    currentPrayer: null,
    nextPrayer: null,
    prayers: [],
    date: getTodaysDate(),
    loading: false,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_APP_STATE:
            return {
                ...action.payload,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};
