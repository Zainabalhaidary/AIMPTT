import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../styles';

class SplashScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.backgroundStyle}>
                <Image source={require('../../assets/aim_black.png')} />
            </View>
        );
    }
}
export default SplashScreen;
