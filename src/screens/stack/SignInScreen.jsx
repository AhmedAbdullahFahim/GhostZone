import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  // KeyboardAvoidingView,
  // Platform,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useForm} from 'react-hook-form';
import ErrorMsg from '../../components/authentication/ErrorMsg';

const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('SignUpScreen');
  };

  async function signIn(data) {
    if (isValid) {
      try {
        await auth().signInWithEmailAndPassword(data.email, data.password);
      } catch (error) {
        console.error(error);
      }
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
              main={'Sign in'}
              smallMain={`Don't have an account?`}
              smallBtn={'Sign up'}
              navigate={navigate}
            />
            <InputField
              name="email"
              placeholder="E-mail"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
            />
            {errors.email && <ErrorMsg message={errors.email.message} />}
            <InputField
              name="password"
              placeholder="Password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              }}
            />
            {errors.password && <ErrorMsg message={errors.password.message} />}
            <Pressable onPress={() => navigation.navigate('Reset')}>
              <Text className="font-bold text-[#F8F8F8] leading-[22px] text-right">
                Forgot password?
              </Text>
            </Pressable>
            <MainBtn title={'Sign in'} submit={handleSubmit(signIn)} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default SignInScreen;
