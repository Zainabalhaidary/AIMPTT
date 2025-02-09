import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import { CITIES } from '../Constants';
import store from '../store';
import { saveAppStateBroker } from '../actions';
import { resetNavigation } from '../utils';

const CityModal = (props) => {
    let state = store.getState();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.modalStyleOuter}>
                <View style={styles.modalStyle}>
                    <ScrollView persistentScrollbar={true}>
                        {CITIES.map(function (city) {
                            return (
                                <View style={styles.settingButtonOuterView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            //change store state
                                            store.dispatch(saveAppStateBroker({ ...state.app, city: city.id }));
                                            //close modal
                                            props.onSelect();
                                            //reset stack?
                                            resetNavigation(props.navigation, "SettingsScreen");
                                        }}>
                                        <View>
                                            <Text style={styles.genericText}>{city.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default CityModal;
