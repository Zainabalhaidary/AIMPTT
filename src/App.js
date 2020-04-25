import React from 'react';
import { YellowBox } from 'react-native';
import AppNavigator from './AppNavigator';
import { backgroundService } from './BackgroundService';
export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Warning:']);//ignore yellow box messages that starts with "Wraning:"
        console.disableYellowBox = true;
        console.log("just before calling backgroundService");
        backgroundService();
    }

    render() {
        return (<AppNavigator />);
    }
}
