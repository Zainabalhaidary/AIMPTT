import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../styles';
import { responsiveWidth } from '../components/react-native-responsive-dimensions';

class SplashScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.backgroundStyle}>
                <Image source={require('../../assets/aim_black.jpeg')} style={{ height: responsiveWidth(50), aspectRatio:1 }} />
            </View>
        );
    }
}
export default SplashScreen;
