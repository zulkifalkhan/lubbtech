import {Image, StyleSheet, View, Text} from 'react-native';

import React from 'react';
import theme from '../../assets/constants/theme';
import {useNavigation} from '@react-navigation/native';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './buttons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.butterCream,
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 70,
      paddingBottom: 40,
    },
    imgContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -100,
      flexGrow: 1,
    },
    img: {
      resizeMode: 'contain',
      width: 220,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {/* <Image
          style={styles.img}
          source={require("../../../images/Butterlogo.png")}
        /> */}
        <Text style={{marginTop: -200, color: theme.colors.butterPink}}>
          Your next social app.
        </Text>
      </View>
      <View>
        <ButtonSecondary
          title={'Create an account'}
          onPress={() => navigation.navigate('SignUp')}></ButtonSecondary>
        <View style={{height: 20}}></View>
        {/*@ts-ignore*/}
        <ButtonPrimary
          title={'Log in'}
          onPress={() => navigation.navigate('Login')}></ButtonPrimary>
        <View style={{height: 24}}></View>
      </View>

      {/*@ts-ignore*/}
      {/* <ButtonLink title={"Don't have an account? Sign up."} onPress={() => navigation.navigate("SignUp")}></ButtonLink> */}
    </View>
  );
};
