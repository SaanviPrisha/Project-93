import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import db from '../Config'
import firebase from 'firebase'

export default class DonateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.navigation.getParam("Data")
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
