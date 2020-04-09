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
// City = 1   City = "birmingham"
// City = 2   City = "brighton"
// City = 3   City = "cardiff"
// City = 4   City = "glasgow"
// City = 5   City = "hull"
// City = 6   City = "leeds"
// City = 7   City = "liverpool"
// City = 8   City = "london"
// City = 9   City = "manchester"
// City = 10   City = "norwich"
// City = 11   City = "plymouth"
// City = 12   City = "portsmouth"
// City = 13   City = "sheffield"
// City = 14   City = "southampton"
// City = 15   City = "swansea"


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
