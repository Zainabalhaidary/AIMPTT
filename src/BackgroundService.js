import BackgroundFetch from "react-native-background-fetch";
import { generateNotifications,  } from "./utils";
// import { getTodayPrayer, getTomorrowPrayer } from "./actions";
export const backgroundServiceForAlarams = (appData) => {
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
      taskId: "com.aim.prayertimes.notification"
    },
    async taskId => {
      console.log('[js] Received background-fetch event: ', taskId);
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
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
        generateNotifications();
        break;
    }
  });
};


// export const backgroundServiceForData = (store) => {
//   console.log("fetching data");
//   // Configure it.
//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 1440, // daily
//       // Android options
//       forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
//       stopOnTerminate: false,
//       startOnBoot: true,
//       requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
//       requiresCharging: false, // Default
//       requiresDeviceIdle: false, // Default
//       requiresBatteryNotLow: false, // Default
//       requiresStorageNotLow: false, // Default
//       taskId: "com.aim.prayertimes.fetchData"
//     },
//     async taskId => {
//       console.log('[js] Received background-fetch event: ', taskId);
//       // Required: Signal completion of your task to native code
//       // If you fail to do this, the OS can terminate your app
//       // or assign battery-blame for consuming too much background-time
//       BackgroundFetch.finish(taskId);
//     }, (error) => {
//       console.log("[js] RNBackgroundFetch failed to start");
//     });
//   // Optional: Query the authorization status.
//   BackgroundFetch.status(status => {
//     switch (status) {
//       case BackgroundFetch.STATUS_RESTRICTED:
//         console.log('BackgroundFetch restricted');
//         break;
//       case BackgroundFetch.STATUS_DENIED:
//         console.log('BackgroundFetch denied');
//         break;
//       case BackgroundFetch.STATUS_AVAILABLE:
//         store.dispatch(getTodayPrayer());
//         store.dispatch(getTomorrowPrayer());
//         break;
//     }
//   });
// };



