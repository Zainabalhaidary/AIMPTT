import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Button, Icon } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import TomorrowScreen from './screens/TomorrowScreen';
import SettingsScreen from './screens/SettingsScreen';
import MonthScreen from './screens/MonthScreen';
import styles from '../styles';
import { white, black, yellow, imsakColor } from '../styles/colors';
import { Image } from 'react-native';
import TodayScreen from './screens/TodayScreen';
import { responsiveHeight } from './components/react-native-responsive-dimensions';
export default class AppNavigator extends React.PureComponent {

    render() {

        return (
            <RootStack />
        );
    }
}

const monthlyViewHeader = ({ navigation }) => {
    return {
        title: '',
        headerTintColor: white,
        headerStyle: styles.headerStyle,
        headerRight: (<Button transparent onPress={() => navigation.navigate('SettingsScreen')} >
            <Icon name='player-settings' type='Fontisto' style={styles.black} />
        </Button>),
        headerLeft: (<Button transparent onPress={() => navigation.navigate('HomeScreen')} >
            <Icon name='home' type='Entypo' style={styles.black} />
        </Button>),
    };
};


const settingsHeader = ({ navigation }) => {
    return {
        title: '',
        headerTintColor: white,
        headerStyle: styles.headerStyle,
        headerLeft: (<Button transparent onPress={() => navigation.navigate('HomeScreen')} >
            <Icon name='home' type='Entypo' style={styles.black} />
        </Button>),
    };
};

const homeHeader = ({ navigation }) => {
    return {
        title: 'AIM prayer times',
        headerTintColor: black,
        headerStyle: styles.headerStyle,
        headerLeft: (
            <Image source={require('../assets/aim_black.png')} style={styles.aimHeaderLogo} />
        ),
        headerRight: (<Button transparent onPress={() => navigation.navigate('SettingsScreen')} >
            <Icon name='setting' type='AntDesign' style={styles.black} />
        </Button>),

    };
};

const secondaryHeader = ({ navigation }) => {
    return {
        title: '',
        headerTintColor: black,
        headerStyle: styles.headerStyle,
        headerRight: (<Button transparent onPress={() => navigation.navigate('SettingsScreen')} >
            <Icon name='setting' type='AntDesign' style={styles.black} />
        </Button>),

    };
};

const AppStack = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: homeHeader
        },
        TomorrowScreen: {
            screen: TomorrowScreen,
            navigationOptions: secondaryHeader
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: settingsHeader
        },
        MonthScreen: {
            screen: MonthScreen,
            navigationOptions: monthlyViewHeader
        }
    }
);

const RootStack = createAppContainer(createSwitchNavigator(
    {
        AppStack: AppStack,
    },
    {
        initialRouteName: 'AppStack',
    }
));

export const MyTabNavigator = createBottomTabNavigator(
    {
        Today: { screen: TodayScreen },
        Tomorrow: { screen: TomorrowScreen },
        Month: { screen: MonthScreen }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeBackgroundColor: yellow,
            inactiveBackgroundColor: imsakColor,
            activeTintColor: black,
            inactiveTintColor: black,
            labelStyle: [styles.genericText, { marginBottom: responsiveHeight(1.7) }],
        }
    }
);

export const RootTab = createAppContainer(MyTabNavigator);


