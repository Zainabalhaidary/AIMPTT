import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getTodayPrayer } from '../actions';
import styles from '../../styles';
import { getTodaysDate, getCityName } from '../utils';
import { imsakColor, dawnColor, sunriseColor, noonColor, sunsetColor, maghribColor, midnightColor, black } from '../../styles/colors';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';

class HomeScreen extends React.PureComponent {
  state = {
    refreshing: false,
  }
  componentDidMount() {
    if (!this.props.app.todaysPrayers || this.props.app.todaysPrayers.Date !== getTodaysDate()) {
      this.props.getTodayPrayer();
    }
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getTodayPrayer().then(() => {
      this.setState({refreshing: false});
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
                <Text style={styles.genericText}>{this.props.app.todaysPrayers && this.props.app.todaysPrayers.Date}</Text>
              </View>
              <View style={{ flex: 5 }}>
                {this.props.app.todaysPrayers &&
                  <View style={{ flex: 1 }}>
                    <View style={[styles.homepageRow, { backgroundColor: imsakColor }]}>
                      <Text style={styles.genericText}>Imsak</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Imsak &&
                          this.props.app.todaysPrayers.Imsak.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: dawnColor }]}>
                      <Text style={styles.genericText}>Dawn</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Dawn &&
                          this.props.app.todaysPrayers.Dawn.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: sunriseColor }]}>
                      <Text style={styles.genericText}>Sunrise</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Sunrise &&
                          this.props.app.todaysPrayers.Sunrise.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: noonColor }]}>
                      <Text style={styles.genericText}>Noon</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Noon &&
                          this.props.app.todaysPrayers.Noon.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: sunsetColor }]}>
                      <Text style={styles.genericText}>Sunset</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Sunset &&
                          this.props.app.todaysPrayers.Sunset.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: maghribColor }]}>
                      <Text style={styles.genericText}>Maghrib</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Maghrib &&
                          this.props.app.todaysPrayers.Maghrib.slice(0, -3)
                        }
                      </Text>
                    </View>
                    <View style={[styles.homepageRow, { backgroundColor: midnightColor }]}>
                      <Text style={styles.genericText}>Midnight</Text>
                      <Text style={styles.genericText}>
                        {
                          this.props.app.todaysPrayers.Midnight &&
                          this.props.app.todaysPrayers.Midnight.slice(0, -3)
                        }
                      </Text>
                    </View>
                  </View>
                }
              </View>
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
export default connect(mapStateToProps, { getTodayPrayer })(HomeScreen);
