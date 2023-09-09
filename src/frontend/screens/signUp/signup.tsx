import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ButterTheme from '../../assets/constants/theme';
import {useNavigation} from '@react-navigation/native';
import {ButtonPrimary} from '../Welcome/buttons';
import useAuth from '../../../backend';
import {Formik} from 'formik';
import {CaretLeft} from 'phosphor-react-native';

export default () => {
  const [age, setAge] = useState('');
  const [postcode, setPostCode] = useState('-');
  const [open, setOpen] = useState(false);

  const [postcodeError, setPostCodeError] = useState(false);

  const navigation = useNavigation();

  const {register, loading} = useAuth();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      display: 'flex',
      height: '100%',
      paddingHorizontal: 30,
      paddingBottom: 14,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: ButterTheme.colors.butterPink,
    },
    imgContainer: {
      display: 'flex',
      width: '100%',
      marginLeft: 10,
    },
    img: {
      resizeMode: 'contain',
      width: 97,
      height: 95,
    },
    welcomeContainer: {
      paddingTop: 100,
      paddingBottom: 30,
      marginHorizontal: 10,
    },
    input: {
      paddingVertical: 12,
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
    <ScrollView style={styles.container}>
      <View style={{height: 25}}></View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{marginTop: 37, marginLeft: -6}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CaretLeft color={'black'} size={25} weight="bold" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}></View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Welcome.</Text>
        <Text style={{fontSize: 20}}>Create an account to get started.</Text>
      </View>

      <Formik
        initialValues={{
          email: '',
          password: '',
          age: '',
          displayName: '',
        }}
        onSubmit={async value => {
          let {email, password, displayName, age} = value;
          await register(email, password, displayName, age);
        }}
        validate={values => {
          let ageInt = null;
          try {
            ageInt = parseInt(values.age);
          } catch {}
          const errors: {
            email?: string;
            password?: string;
            displayName?: string;
            age?: string;
            postcode?: string;
          } = {};
          if (!values.displayName) {
            errors.displayName = 'Full name required';
          }
          if (!(ageInt && ageInt >= 18)) {
            console.log({ageInt, age});
            errors.age = 'You must be 18 years or older';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
                  placeholder={'Full name'}
                  onChangeText={handleChange('displayName')}
                  onBlur={handleBlur('displayName')}
                  placeholderTextColor="gray"
                  value={values.displayName}
                  returnKeyType="done"></TextInput>
                {errors.displayName && touched.displayName && (
                  <Text>{errors.displayName}</Text>
                )}

                <View style={{height: 14}}></View>
                <TextInput
                  style={styles.input}
                  placeholder={'Age'}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  placeholderTextColor="gray"
                  value={values.age}
                  returnKeyType="done"></TextInput>
                {errors.age && touched.age && <Text>{errors.age}</Text>}

                <View style={{height: 14}}></View>
                <TextInput
                  style={styles.input}
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholderTextColor="gray"
                  value={values.email}
                  returnKeyType="done"></TextInput>
                {errors.email && touched.email && <Text>{errors.email}</Text>}

                <View style={{height: 14}}></View>
                <TextInput
                  style={styles.input}
                  textContentType={'password'}
                  placeholder={'Password'}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholderTextColor="gray"
                  value={values.password}
                  returnKeyType="done"></TextInput>

                {errors.password && touched.password && (
                  <Text>{errors.password}</Text>
                )}

                <View style={{paddingHorizontal: 20, marginTop: 30}}>
                  <ButtonPrimary
                    title={'Sign up'}
                    onPress={async () => {
                      setPostCodeError(true);
                      handleSubmit();
                    }}></ButtonPrimary>

                  <View style={{height: 14}}></View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};
