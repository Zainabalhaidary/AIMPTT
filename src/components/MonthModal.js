import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import { MONTHS } from '../Constants';

const MonthModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.modalStyleOuter}>
                <View style={styles.modalStyle}>
                    <ScrollView persistentScrollbar={true}>
                        {MONTHS.map(function (month) {
                            return (
                                <View style={styles.settingButtonOuterView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            //close modal and pass month
                                            props.onSelect(month.id);
                                        }}>
                                        <View>
                                            <Text style={styles.genericText}>{month.name}</Text>
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

export default MonthModal;
