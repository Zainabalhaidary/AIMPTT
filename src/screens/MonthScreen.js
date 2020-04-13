import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getPrayers } from '../actions';
import styles from '../../styles';
import { getCityName, getMonthStartDate, getMonthEndDate } from '../utils';
import { black } from '../../styles/colors';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';
import moment from 'moment';

class MonthScreen extends React.PureComponent {
  state = {
    refreshing: false,
    startDate: getMonthStartDate(),
    endDate: getMonthEndDate()
  }
  componentDidMount() {
    if (!this.props.app.prayers.length ||
      this.props.app.prayers.length === 0 ||
      moment(this.props.app.prayers[0].Date).month() !== moment().month()) {
      this.props.getPrayers(this.state.startDate, this.state.endDate);
    }
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPrayers(this.state.startDate, this.state.endDate).then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    if (this.props.app.loading || this.state.refreshing) {
      return (
        <ActivityIndicator size="large" color={black} style={styles.activityIndicator} />
      );
    }
    else if (this.props.app.error) {
      return (
        <View style={[styles.backgroundStyle, { paddingHorizontal: responsiveWidth(12) }]} >
          <Text style={styles.textFont}>{this.props.app.error}</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.backgroundStyle}>
          <View>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
              }
            >
              <View style={[styles.backgroundStyle]}>
                <Text style={styles.textFont}>{getCityName(this.props.app.city)}</Text>
                <Text style={styles.genericText}>{moment(this.state.startDate).format('MMMM')}</Text>
              </View>
              <View style={{ flex: 5 }}/>
              <View style={{ flex: 0.5 }} />
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}
export default connect(mapStateToProps, { getPrayers })(MonthScreen);
