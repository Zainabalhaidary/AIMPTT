/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

//sync app state with device internal storage
const setup = require('./src/SyncWithInternalStorageSetup');

AppRegistry.registerComponent(appName, setup);
