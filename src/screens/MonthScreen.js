import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, Picker } from 'react-native';
import { connect } from 'react-redux';
import { getPrayers } from '../actions';
import styles from '../../styles';
import { getMonthStartDate, getMonthEndDate } from '../utils';
import { black, imsakColor } from '../../styles/colors';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';
import moment from 'moment';
import { CITIES, MONTHS } from '../Constants';

class MonthScreen extends React.PureComponent {
  state = {
    refreshing: false,
    month: moment().month(),
    city: this.props.app.city,
  }
  componentWillMount = () => {
    if (!this.props.app.prayers.length ||
      this.props.app.prayers.length === 0 ||
      moment(this.props.app.prayers[0].Date).month() !== moment().month() ||
      this.props.app.prayers[0].City !== this.props.app.city
    ) {
      this.props.getPrayers(this.state.city, getMonthStartDate(this.state.month), getMonthEndDate(this.state.month));
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getPrayers(this.state.city, getMonthStartDate(this.state.month), getMonthEndDate(this.state.month)).then(() => {
      this.setState({ refreshing: false });
    });
  }
  updateState = async (name, value) => {
    await this.promisedSetState({ [name]: value });
    this.onRefresh();
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve();
      });
    });
  }

  render() {
    const prayers = this.props.app.prayers;
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
            <View style={[styles.backgroundStyle, { flexDirection: "row", justifyContent: 'space-evenly' }]}>
              <Picker
                selectedValue={this.state.city}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.updateState("city", itemValue)}
              >
                {
                  CITIES.map(function (city) {
                    return (<Picker.Item label={city.name} value={city.id} key={city.id} />);
                  })
                }
              </Picker>

              <Picker
                selectedValue={this.state.month}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.updateState("month", itemValue)}
              >
                {
                  MONTHS.map(function (month) {
                    return (<Picker.Item label={month.name} value={month.id} key={month.id} />);
                  })
                }
              </Picker>
            </View>
            <View style={{ flex: 6 }}>
              {prayers && prayers.length > 0 &&
                <ScrollView
                  persistentScrollbar={true}
                  contentContainerStyle={{ ...styles.scrollView, flexDirection: 'row' }}
                  refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                  }
                >
                  <View key="titlesView" style={styles.monthColumn}>
                    <View style={styles.monthCellWithoutColor} key="Date"><Text style={styles.smallText}>Date</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Day"><Text style={styles.smallText}>Day</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Imsak"><Text style={styles.smallText}>Imsak</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Dawn"><Text style={styles.smallText}>Dawn</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Sunrise"><Text style={styles.smallText}>Sunrise</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Noon"><Text style={styles.smallText}>Noon</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Sunset"><Text style={styles.smallText}>Sunset</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Maghrib"><Text style={styles.smallText}>Maghrib</Text></View>
                    <View style={styles.monthCellWithoutColor} key="Midnight"><Text style={styles.smallText}>Midnight</Text></View>
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    persistentScrollbar={true}
                    pagingEnabled={true}>
                    {
                      prayers.map(function (prayer) {
                        return (
                          <View key={"DataView" + prayer.Date} style={{ ...styles.monthColumn, backgroundColor: imsakColor }}>
                            <View style={styles.monthCell} key={1 + prayer.Date}><Text style={styles.genericText}>{moment(prayer.Date).format("MM-DD")}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={2 + prayer.Date}><Text style={styles.genericText}>{moment(prayer.Date).format("ddd")}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Imsak}><Text style={styles.genericText}>{prayer.Imsak && prayer.Imsak.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Dawn}><Text style={styles.genericText}>{prayer.Dawn && prayer.Dawn.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Sunrise}><Text style={styles.genericText}>{prayer.Sunrise && prayer.Sunrise.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Noon}><Text style={styles.genericText}>{prayer.Noon && prayer.Noon.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Sunset}><Text style={styles.genericText}>{prayer.Sunset && prayer.Sunset.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Maghrib}><Text style={styles.genericText}>{prayer.Maghrib && prayer.Maghrib.slice(0, -3)}</Text></View>
                            <View style={styles.monthCellWithoutColor} key={prayer.Date + prayer.Midnight}><Text style={styles.genericText}>{prayer.Midnight && prayer.Midnight.slice(0, -3)}</Text></View>
                          </View>
                        );
                      })
                    }
                  </ScrollView>
                </ScrollView>
              }
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
export default connect(mapStateToProps, { getPrayers })(MonthScreen);
