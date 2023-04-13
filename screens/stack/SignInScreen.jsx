import {View, Text, ImageBackground, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';

/*
  to do:
    - transition between screens on figma is cool tbh...
    - make sure the keyboard doesn't show on top of the elements.
    - when password field is empty, setShowPassword(false)
    - font family
*/

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View className="h-screen">
      <ImageBackground
        source={require('../../assets/images/authBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-16">
          <Heading
            main={'Sign in'}
            smallMain={`Don't have an account`}
            smallBtn={'Sign up'}
          />
          {/* it seems like the border colors change but they don't, it's just how they're aligned on top of the background, which is the same case in the design itself, a small workaround was to set the borderWidth to 1 except for the bottom border to 0.6 (design was 0.4 but it's too thin) */}
          <InputField type={'email'} value={email} set={setEmail} />
          <InputField type={'password'} value={password} set={setPassword} />

          <Pressable>
            <Text className="font-bold text-[#F8F8F8] leading-[22px] text-right">
              Forgot password?
            </Text>
          </Pressable>
          <MainBtn title={'Sign in'} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;
