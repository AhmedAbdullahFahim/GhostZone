import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignInScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Set an initializing state whilst Firebase connects

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('Signin');
  };

  // Handle create account button press
  async function createAccount() {
    try {
      if (password === confirmPassword) {
        await auth().createUserWithEmailAndPassword(email, password);
        const update = {
          displayName: name,
        };
        await auth().currentUser.updateProfile(update);
      } else {
        console.log('Password does not match!');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1}}
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <ImageBackground
          source={require('../../assets/images/backgrounds/authBG.png')}
          className="flex-1"
          resizeMode="cover">
          <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-10">
            <Heading
              main={'Sign up'}
              smallMain={`Already have an account?`}
              smallBtn={'Sign in'}
              navigate={navigate}
            />
            <InputField type={'name'} value={name} set={setName} />
            <InputField type={'email'} value={email} set={setEmail} />
            <InputField
              type={'phone number'}
              value={phoneNumber}
              set={setPhoneNumber}
            />
            <InputField type={'password'} value={password} set={setPassword} />
            <InputField
              type={'confirm password'}
              value={confirmPassword}
              set={setConfirmPassword}
            />

            <MainBtn title={'Sign up'} submit={createAccount} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default SignInScreen;
