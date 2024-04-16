import React from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'

const SignupForm = ({ navigation }) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(6, 'Password must be at least 6 characters'),
    username: Yup.string().required().min(2, 'A username is required'),
  })

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('Firebase User Created Successful', email, password)

      db.collection('users')
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        })
    } catch (error) {
      Alert.alert('Signup Error', error.message)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        onSubmit={values => {
          onSignup(values.email, values.password, values.username)
        }}
        validateOnMount={true}
        validationSchema={SignupFormSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={[
              styles.inputField,
              {
                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
              },
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder="Email"
                autoCapitalize='none'
                inputMode='email-address'
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
            <View style={[
              styles.inputField,
              { borderColor: 1 > values.username.length || values.username.length >= 3 ? '#ccc' : 'red' }
            ]}>
              <TextInput
                placeholderTextColor='#444'
                placeholder="Username"
                autoCapitalize='none'
                textContentType='username'
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#6BB0F5' }}>Log in</Text>
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
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    padding: 12,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096f6' : '#90cdf7',
    minHeight: 42,
    marginTop: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
})

export default SignupForm
