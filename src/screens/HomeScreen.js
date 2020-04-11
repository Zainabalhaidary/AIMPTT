import React from 'react';
import { View } from 'react-native';
import { RootTab } from '../AppNavigator';

class HomeScreen extends React.PureComponent {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootTab />
      </View>
    );
  }
}

export default HomeScreen;
