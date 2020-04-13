import { SAVE_APP_STATE, PRAYERS_ARE_LOADING, PRAYERS_HAS_ERRORED } from '../actions/types';

const INITIAL_STATE = {
    city: 8,//london by default
    adjustment: 0,
    notificationType: 1, //0: silent/vibrationg, 1:azan
    eventType: null, //prayer/ non- prayer
    pinned: true,
    currentPrayer: null,
    nextPrayer: null,
    todaysPrayers: null,
    tomorrowsPrayers: null,
    prayers: [],
    loading: false,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRAYERS_ARE_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SAVE_APP_STATE:
            return {
                ...action.payload,
                loading: false,
                error: null,
            };
        case PRAYERS_HAS_ERRORED:
            return {
                ...INITIAL_STATE,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
