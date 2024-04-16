import React from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { firebase, db } from '../../firebase'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { Formik } from 'formik'

const LoginForm = ({ navigation }) => {
  const LoginFormScheme = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(6, 'Password must be at least 6 characters'),
  })

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log('Firebase login successful', email, password)
    } catch (error) {
      Alert.alert(
        'Login Error',
        error.message,
        [
          {
            text: 'Try Again',
            onPress: () => console.log('Try Again Pressed'),
            style: 'cancel',
          },
          {
            text: 'Sign Up',
            onPress: () => navigation.push('SignupScreen'),
          }
        ]
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          onLogin(values.email, values.password)
        }}
        validateOnMount={true}
        validanionSchema={LoginFormScheme}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) =>
        (
          <>
            <View style={[
              styles.inputField,
              {
                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
              },
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder="Phone number, username or email"
                autoCapitalize='none'
                inputMode='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={[
              styles.inputField,
              { borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red' }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                autoCorrect={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot password</Text>
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{ color: '#6BB0F5' }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },

  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    marginBottom: 10,
  },

  button: isValid => ({
    backgroundColor: isValid ? '#0095F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),

  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 50,
  },
});

export default LoginForm
