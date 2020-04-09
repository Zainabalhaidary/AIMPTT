/***************************************************************************************/
//The purpose of this is to sync the app state (signedIn, hasPin ...)
//with the device's internal storage so that when user re-opens the app, they would find it in the same old state they left it at.
/************************************************************************************** */
import React from "react";
import App from "./App";
import SplashScreen from './screens/SplashScreen';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, {persistor} from './store';

function setup() {

    class Root extends React.PureComponent {

        render() {
            return (
                <Provider store={store}>
                    {/* the loading and persistor props are both required! */}
                    <PersistGate loading={<SplashScreen />} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            );
        }
    }
    return Root;
}

module.exports = setup;
