import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import commonColor from '../../../theme/variables/commonColor';

export class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.background}>
      </View>
    )
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
    background : {
        flex : 1,
        backgroundColor : commonColor.brandPrimary,
    }
})