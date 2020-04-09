import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';
import reducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer, applyMiddleware(thunk, createLogger()));
export const persistor = persistStore(store);

export default store;
