import React from 'react';
import { Modal, View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../styles';
import store from '../store';
import { saveAppStateBroker } from '../actions';
import { connect } from 'react-redux';
import { responsiveWidth } from './react-native-responsive-dimensions';

class NotificationTypeModal extends React.PureComponent {
    state = {
        soundSwitchValue: this.props.app.notificationTypeSound,
        vibrateSwitchValue: this.props.app.notificationTypeVibrate,
    }
    toggleSwitch = (item, value) => {
        this.setState({ [item]: value });
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
            >
                <View style={styles.modalStyleOuter}>
                    <View style={{ ...styles.modalStyleSmall, paddingVertical: responsiveWidth(5), width: responsiveWidth(60) }}>
                        <View style={{ ...styles.settingButtonOuterView, paddingVertical: responsiveWidth(1) }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                                <Text>Sound</Text>
                                <Switch
                                    onValueChange={(value) => this.toggleSwitch("soundSwitchValue", value)}
                                    value={this.state.soundSwitchValue} />
                            </View>
                        </View>

                        <View style={{ ...styles.settingButtonOuterView, paddingVertical: responsiveWidth(1) }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                                <Text>Vibrate</Text>
                                <Switch
                                    onValueChange={(value) => this.toggleSwitch("vibrateSwitchValue", value)}
                                    value={this.state.vibrateSwitchValue} />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                //change store state
                                store.dispatch(saveAppStateBroker({
                                    ...this.props.app,
                                    notificationTypeSound: this.state.soundSwitchValue,
                                    notificationTypeVibrate: this.state.vibrateSwitchValue
                                }));
                                //close modal
                                this.props.onSelect();
                            }}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onSelect}>
                                <Text>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
    };
}
export default connect(mapStateToProps, {})(NotificationTypeModal);
