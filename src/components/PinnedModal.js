import React from 'react';
import { Modal, View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../styles';
import store from '../store';
import { saveAppState } from '../actions';
import { connect } from 'react-redux';
import { responsiveWidth } from './react-native-responsive-dimensions';

class PinnedModal extends React.PureComponent {
    state = {
        pinnedSwitchValue: this.props.app.pinned,
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
                                <Text>Pinned Notification</Text>
                                <Switch
                                    onValueChange={(value) => this.toggleSwitch("pinnedSwitchValue", value)}
                                    value={this.state.pinnedSwitchValue} />
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                //change store state
                                store.dispatch(saveAppState({
                                    ...this.props.app,
                                    pinned: this.state.pinnedSwitchValue
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
export default connect(mapStateToProps, {})(PinnedModal);
