import moment from "moment";
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

