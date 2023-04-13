import {View, Text, ImageBackground, Pressable} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('Signin');
  };

  return (
    <View className="h-screen">
      <ImageBackground
        source={require('../../assets/images/authBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-16">
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

          <MainBtn title={'Sign up'} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;
