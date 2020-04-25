import BackgroundFetch from "react-native-background-fetch";
import store from './store';
import { generateNotifications } from "./utils";
export const backgroundService = () => {
  let obj = {
    id: "2897",
    City: "8",
    Date: "2019-12-08",
    Day: "8",
    Imsak: "06:00:00",
    Dawn: "06:10:00",
    Sunrise: "07:53:00",
    Noon: "11:53:00",
    Sunset: "15:52:00",
    Maghrib: "17:48:00",
    Midnight: "23:08:00"
  };
  console.log("configuring background service");
  // Configure it.
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
      requiresCharging: false, // Default
      requiresDeviceIdle: false, // Default
      requiresBatteryNotLow: false, // Default
      requiresStorageNotLow: false, // Default
    },
    async taskId => {
      console.log('[js] Received background-fetch event: ', taskId);
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time

      // generateNotifications(store.getState().app.todaysPrayers);
      // generateNotifications(obj);
      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
  // Optional: Query the authorization status.
  BackgroundFetch.status(status => {
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log('BackgroundFetch restricted');
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log('BackgroundFetch denied');
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log('BackgroundFetch is enabled');
        generateNotifications(obj);
        break;
    }
  });
};



