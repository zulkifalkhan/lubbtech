import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import theme from '../../assets/constants/theme';
import {ButtonLink, ButtonPrimary} from '../../screens/Welcome/buttons';
import useAuth from '../../../backend';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CaretLeft} from 'phosphor-react-native';

export default () => {
  const {signIn, signOut, resetPassword, user, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const forgotPassword = async () => {
    await resetPassword(forgotEmail);
    setVisible(false);
  };

  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      display: 'flex',
      height: '100%',
      paddingHorizontal: 30,
      paddingVertical: 25,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: theme.colors.butterPink,
    },
    imgContainer: {
      display: 'flex',
      marginLeft: 10,
      width: '100%',
    },
    img: {
      resizeMode: 'contain',
      width: 97,
      height: 95,
    },
    welcomeContainer: {
      paddingVertical: 120,
    },
    input: {
      paddingVertical: 8,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      borderBottom: 'solid',
    },
  });
  if (loading) {
    return (
      <SafeAreaView style={{paddingTop: 20}}>
        <ActivityIndicator></ActivityIndicator>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{marginTop: 37, marginLeft: -6}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CaretLeft color={'black'} size={25} weight="bold" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}></View>
      </View>
      <View>
        <View style={{paddingBottom: 50, marginHorizontal: 10}}>
          <Text style={styles.title}>Welcome back.</Text>
          <Text style={{fontSize: 20}}>Sign in to get started.</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={value => signIn(value.email, value.password)}
          validate={values => {
            const errors: {email?: string; password?: string} = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 8) {
              errors.password = 'Must be longer then 8 characters';
            }
            return errors;
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={{marginHorizontal: 10}}>
                <KeyboardAvoidingView>
                  <TextInput
                    style={styles.input}
                    placeholder={'Email'}
                    placeholderTextColor="gray"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    returnKeyType="done"></TextInput>
                  {errors.email && touched.email && <Text>{errors.email}</Text>}

                  <View style={{height: 24}}></View>
                  <TextInput
                    style={styles.input}
                    textContentType={'password'}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder={'Password'}
                    placeholderTextColor="gray"
                    returnKeyType="done"></TextInput>
                  {errors.password && touched.password && (
                    <Text>{errors.password}</Text>
                  )}
                </KeyboardAvoidingView>

                <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                  <ButtonPrimary
                    title={'Sign in'}
                    onPress={async () => {
                      handleSubmit();
                    }}></ButtonPrimary>

                  {/* <View style={{height: 14}}></View> */}
                  {/* <ButtonPrimary title={"Debug: Sign in (dev account)"} onPress={async () => {
                  await signIn("jane.doe@example.com", "SuperSecretPassword");
              }}></ButtonPrimary>
                      <ButtonPrimary title={"Debug: Sign in (dev account2)"} onPress={async () => {
                          await signIn("jane.doe2@example.com", "SuperSecretPassword");
                      }}></ButtonPrimary> */}
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View>
        <ButtonLink
          title={"Don't have an account? Sign up."}
          onPress={() =>
            //@ts-ignore
            navigation.navigate('SignUp')
          }></ButtonLink>
      </View>
    </View>
  );
};
