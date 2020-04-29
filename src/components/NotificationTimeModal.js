import React from 'react';
import { Modal, View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../styles';
import store from '../store';
import { saveAppStateBroker } from '../actions';
import { connect } from 'react-redux';
import { responsiveWidth, responsiveHeight } from './react-native-responsive-dimensions';

class NotificationTypeModal extends React.PureComponent {
    state = {
        Imsak: this.props.app.notificationTimes.includes(0),
        Dawn: this.props.app.notificationTimes.includes(1),
        Sunrise: this.props.app.notificationTimes.includes(2),
        Noon: this.props.app.notificationTimes.includes(3),
        Sunset: this.props.app.notificationTimes.includes(4),
        Maghrib: this.props.app.notificationTimes.includes(5),
        Midnight: this.props.app.notificationTimes.includes(6),
    }
    toggleSwitch = (item, value) => {
        this.setState({ [item]: value });
    }
    render() {
        let currState = this.state;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
            >
                <View style={styles.modalStyleOuter}>
                    <View style={{...styles.modalStyle, paddingTop:responsiveWidth(3), height:responsiveHeight(60)}}>
                        {Object.keys(this.state).map((key)=>{
                            return (
                                <View style={{...styles.settingButtonOuterView, paddingVertical:responsiveWidth(0)}}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Text>{key}</Text>
                                        <Switch
                                            onValueChange={(value) => this.toggleSwitch(key, value)}
                                            value={currState[key]} />
                                    </View>
                                </View>
                            );
                        })}

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                //change store state
                                store.dispatch(saveAppStateBroker({
                                    ...this.props.app,
                                    notificationTimes: [
                                        this.state.Imsak ? 0 : null,
                                        this.state.Dawn ? 1 : null,
                                        this.state.Sunrise ? 2 : null,
                                        this.state.Noon ? 3 : null,
                                        this.state.Sunset ? 4 : null,
                                        this.state.Maghrib ? 5 : null,
                                        this.state.Midnight ? 6 : null,
                                    ]
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
