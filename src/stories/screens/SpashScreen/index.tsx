import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import styles from '../Home/styles';
import commonStyles from '../../../theme/variables/commonStyles';
import { Spinner } from 'native-base';
import commonColor from '../../../theme/variables/commonColor';
export interface Props {
  navigation: any;

}
export interface State { 
}
export class SpashScreen extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Image 
            style={{width : commonColor.iconSizeLarge, height : commonColor.iconSizeLarge-100, resizeMode : 'contain'}}
            source={require('./../../../../assets/WellJoinClass.png')}/>
        <Spinner  color={commonColor.brandPrimary}/>
        <Image source={require('./../../../../assets/actlogo.png')}/>
      </View>
    )
  }
}

export default SpashScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent : 'center'
    }
})

