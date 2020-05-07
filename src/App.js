import React from 'react';
import { YellowBox } from 'react-native';
import AppNavigator from './AppNavigator';
import { backgroundServiceForAlarams } from './BackgroundService';
import { scheduleNextPrayer } from './utils';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Warning:']);//ignore yellow box messages that starts with "Wraning:"
        console.disableYellowBox = true;
        scheduleNextPrayer();
        backgroundServiceForAlarams();
    }

    render() {
        return (<AppNavigator />);
    }
}
