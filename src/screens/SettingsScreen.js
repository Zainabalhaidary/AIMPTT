import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { getEventName, getCityName } from '../utils';
import { connect } from 'react-redux';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';
import { Icon } from 'native-base';
import CityModal from '../components/CityModal';
import NotificationTypeModal from '../components/NotificationTypeModal';

class SettingsScreen extends React.PureComponent {
  state = {
    showCityModal: false,
    showNotificationTypeModal: false,
    showNotificationTimeModal: false,
    showPinnedModal: false,
  }

  changeModalState = (modalName, value) => {
    this.setState({ [modalName]: value });
  }

  render() {
    return (
      <View style={{ flex: 8, justifyContent: 'flex-start' }}>
        <View style={styles.settingButtonOuterView}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.changeModalState("showCityModal", true)}>
            <View style={{ paddingRight: responsiveWidth(5) }}><Icon type="Entypo" name="location-pin" /></View>
            <View>
              <Text style={styles.genericText}>City</Text>
              <Text style={styles.smallText}>{getCityName(this.props.app.city)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingButtonOuterView}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.changeModalState("showNotificationTypeModal", true)}>
            <View style={{ paddingRight: responsiveWidth(5) }}><Icon type="Ionicons" name="md-notifications-outline" /></View>
            <View>
              <Text style={styles.genericText}>Notification Type</Text>
              <Text style={styles.smallText}>
                {
                  (this.props.app.notificationTypeSound ? "Sound " : "") +
                  (this.props.app.notificationTypeVibrate ? "Vibrate " : "") +
                  (!this.props.app.notificationTypeVibrate && !this.props.app.notificationTypeSound ? "Silent " : "")
                }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingButtonOuterView}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.changeModalState("showNotificationTimeModal", true)}>
            <View style={{ paddingRight: responsiveWidth(5) }}><Icon type="Ionicons" name="ios-time" /></View>
            <View>
              <Text style={styles.genericText}>Notification Times</Text>
              <Text style={styles.smallText}>{this.props.app.notificationTimes.map(function (time) { return getEventName(time) + "  "; })}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingButtonOuterView}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.changeModalState("showPinnedModal", true)}>
            <View style={{ paddingRight: responsiveWidth(5) }}><Icon type="MaterialCommunityIcons" name="pin" /></View>
            <View>
              <Text style={styles.genericText}>Pinned Notification</Text>
              <Text style={styles.smallText}>{this.props.app.pinned ? "Yes" : "No"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
          {
            this.state.showCityModal &&
            <CityModal
              onSelect={() => this.changeModalState("showCityModal", false)}
              visible={this.state.showCityModal}
              navigation={this.props.navigation}
            />
          }
          {
            this.state.showNotificationTypeModal &&
            <NotificationTypeModal
              onSelect={() => this.changeModalState("showNotificationTypeModal", false)}
              visible={this.state.showNotificationTypeModal}
              navigation={this.props.navigation}
            />
          }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}
export default connect(mapStateToProps, {})(SettingsScreen);
