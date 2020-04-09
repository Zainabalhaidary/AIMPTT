import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getCurrentPrayer } from '../actions';
import styles from '../../styles';
import { getTodaysDate, getCityName } from '../utils';

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    if (this.props.app.date !== getTodaysDate()) {
      this.props.getCurrentPrayer();
    }
  }
  render() {
    if (this.props.app.loading) {
      return (
        <ActivityIndicator size="large" color="#ffffff" style={styles.activityIndicator} />
      );
    }
    else {
      return (
        <View style={styles.backgroundStyle}>
          <View style={[styles.formView]}>
            <View style={[styles.backgroundStyle]}>
              <Text style={[styles.textWhite, styles.textFont]}>{getCityName(this.props.app.city)}</Text>
              <Text style={[styles.textWhite, styles.textFont]}>{this.props.app.date}</Text>
            </View>
            <View style={{ flex: 5 }}>

            </View>
            <View style={{ flex: 1 }}>

            </View>
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
export default connect(mapStateToProps, { getCurrentPrayer })(HomeScreen);
