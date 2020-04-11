import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getCurrentPrayer } from '../actions';
import styles from '../../styles';
import { getTodaysDate, getCityName } from '../utils';
import { imsakColor, dawnColor, sunriseColor, noonColor, sunsetColor, maghribColor, midnightColor, black } from '../../styles/colors';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    if (!this.props.app.currentPrayer || this.props.app.currentPrayer.Date !== getTodaysDate()) {
    this.props.getCurrentPrayer();
    }
  }
  render() {
    if (this.props.app.loading) {
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
          <View style={[styles.formView]}>
            <View style={[styles.backgroundStyle]}>
              <Text style={styles.textFont}>{getCityName(this.props.app.city)}</Text>
              <Text style={styles.genericText}>{this.props.app.date}</Text>
            </View>
            <View style={{ flex: 5 }}>
              {this.props.app.currentPrayer &&
                <View style={{ flex: 1 }}>
                  <View style={[styles.homepageRow, { backgroundColor: imsakColor }]}>
                    <Text style={styles.genericText}>Imsak</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Imsak &&
                        this.props.app.currentPrayer.Imsak.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: dawnColor }]}>
                    <Text style={styles.genericText}>Dawn</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Dawn &&
                        this.props.app.currentPrayer.Dawn.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: sunriseColor }]}>
                    <Text style={styles.genericText}>Sunrise</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Sunrise &&
                        this.props.app.currentPrayer.Sunrise.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: noonColor }]}>
                    <Text style={styles.genericText}>Noon</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Noon &&
                        this.props.app.currentPrayer.Noon.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: sunsetColor }]}>
                    <Text style={styles.genericText}>Sunset</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Sunset &&
                        this.props.app.currentPrayer.Sunset.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: maghribColor }]}>
                    <Text style={styles.genericText}>Maghrib</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Maghrib &&
                        this.props.app.currentPrayer.Maghrib.slice(0, -3)
                      }
                    </Text>
                  </View>
                  <View style={[styles.homepageRow, { backgroundColor: midnightColor }]}>
                    <Text style={styles.genericText}>Midnight</Text>
                    <Text style={styles.genericText}>
                      {
                        this.props.app.currentPrayer.Midnight &&
                        this.props.app.currentPrayer.Midnight.slice(0, -3)
                      }
                    </Text>
                  </View>
                </View>
              }
            </View>
            <View style={{ flex: 0.5 }} />
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
