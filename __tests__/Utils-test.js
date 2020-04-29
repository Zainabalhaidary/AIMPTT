import { isBetween, getMonthStartDate, getMonthEndDate, getDateWithTime, getNextPrayer, getTimeDiff } from "../src/utils";
import moment from "moment";

jest.mock('react-native-push-notification', () => ({
    configure: jest.fn(),
    onRegister: jest.fn(),
    onNotification: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));
beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
});


test("Test isBetween method ", () => {
    expect(isBetween("19:22", "19:15", "19:30")).toBe(true);
});

test("Test isBetween method ", () => {
    expect(isBetween("19:10", "19:15", "19:30")).toBe(false);
});


test("Test getMonthStartDate method ", () => {
    expect(getMonthStartDate(0)).toEqual(moment().year() + "-01-01");
});

test("Test getMonthStartDate method ", () => {
    expect(getMonthEndDate(0)).toEqual(moment().year() + "-01-31");
});

test("Test add 15 mins to time method ", () => {
    let format = 'HH:mm';
    let timeStart = moment("19:00", format);
    let timeEnd = moment(timeStart, format).add(15, 'minutes').format(format);
    expect(timeEnd).toEqual("19:15");
});


test("Test getDateWithTime method ", () => {
    expect(getDateWithTime("21:15:00", moment("2020-04-01", "YYYY-MM-DD"))).toEqual(new Date("2020-04-01T20:15:00.000Z"));
});

test("get next key-value pair from an object", () => {
    let keys = Object.keys({
        id: "2897",
        City: "8",
        Date: "2019-12-08",
        Day: "8",
        Imsak: "06:00:00",
        Dawn: "06:10:00",
        Sunrise: "07:53:00",
        Noon: "11:53:00",
        Sunset: "15:52:00",
        Maghrib: "16:07:00",
        Midnight: "23:08:00"
    });
    let nextEventIndex = keys.indexOf("Sunrise") + 1;
    let nextItem = keys[nextEventIndex];
    console.log("nextEventIndex " + nextEventIndex);
    console.log("nextItem " + nextItem);
});

test("test getNextPrayer function 1", () => {
    let today = {
        id: "2897",
        City: "8",
        Date: "2019-12-08",
        Day: "8",
        Imsak: "06:00:00",
        Dawn: "06:10:00",
        Sunrise: "07:53:00",
        Noon: "11:53:00",
        Sunset: "15:52:00",
        Maghrib: "16:07:00",
        Midnight: "23:08:00"
    };
    let tom = {
        id: "2897",
        City: "8",
        Date: "2019-12-08",
        Day: "8",
        Imsak: "06:00:00",
        Dawn: "06:11:00",
        Sunrise: "07:53:00",
        Noon: "11:53:00",
        Sunset: "15:52:00",
        Maghrib: "16:07:00",
        Midnight: "23:08:00"
    };
    expect(getNextPrayer(today, tom, "Dawn")).toEqual({ "key": "Noon", "value": "11:53:00" });
});

test("test getNextPrayer function 2", () => {
    let today = {
        id: "2897",
        City: "8",
        Date: "2019-12-08",
        Day: "8",
        Imsak: "06:00:00",
        Dawn: "06:10:00",
        Sunrise: "07:53:00",
        Noon: "11:53:00",
        Sunset: "15:52:00",
        Maghrib: "16:07:00",
        Midnight: "23:08:00"
    };
    expect(getNextPrayer(today, today, "Maghrib")).toEqual({ "key": "Dawn", "value": "06:10:00" });
});

test("test getTimeDiff function ", () => {
    expect(getTimeDiff("19:45", "20:10")).toEqual(1500000);
});


