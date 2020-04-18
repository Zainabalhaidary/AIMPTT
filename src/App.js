import React from 'react';
import { YellowBox, Alert } from 'react-native';
import AppNavigator from './AppNavigator';
// import NotificationService from './NotificationService';
export default class App extends React.PureComponent {
    constructor(props) {
        YellowBox.ignoreWarnings(['Warning:']);//ignore yellow box messages that starts with "Wraning:"
        console.disableYellowBox = true;
        // this.notification = new NotificationService(this.onNotification);
        super();
    }

    // //Gets called when the notification comes in
    // onNotification = (notif) => {
    //     Alert.alert(notif.title, notif.message);
    // }

    // //Permissions to use notifications
    // handlePerm(perms) {
    //     Alert.alert("Permissions", JSON.stringify(perms));
    // }

    // componentDidMount =() =>{
    //     this.notification.localNotification();
    //     this.notification.scheduleNotification();
    // }
    render() {
        return (<AppNavigator />);
    }
}
