import React from 'react';
import { YellowBox } from 'react-native';
import AppNavigator from './AppNavigator';

export default class App extends React.PureComponent {
    constructor(props) {
        YellowBox.ignoreWarnings(['Warning:']);//ignore yellow box messages that starts with "Wraning:"
        console.disableYellowBox = true;
        super();
    }

    render() {
        return (
            // <Root>
                <AppNavigator />
            // </Root>
        );
    }
}
