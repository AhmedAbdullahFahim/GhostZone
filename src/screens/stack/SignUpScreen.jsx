import {
  View,
  ImageBackground,
  // KeyboardAvoidingView,
  // Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const pwd = watch('password');

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('SignInScreen');
  };

  // Handle create account button press
  function createAccount(data) {
    if (isValid) {
      try {
        auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(userCredentials => {
            if (userCredentials.user) {
              userCredentials.user
                .updateProfile({
                  displayName: data.name,
                })
                .then(s => {
                  navigation.navigate('SubscriptionPlanScreen');
                });
            }
          });
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
            <InputField
              name="name"
              placeholder="Name"
              control={control}
              rules={{
                required: 'Name is required',
              }}
            />
            {errors.name && <ErrorMsg message={errors.name.message} />}

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
            <InputField
              name="confirmPassword"
              placeholder="Confirm Password"
              control={control}
              rules={{
                required: 'Password confirmation is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: value => value === pwd || 'Passwords do not match',
              }}
            />
            {errors.confirmPassword && (
              <ErrorMsg message={errors.confirmPassword.message} />
            )}

            <MainBtn title={'Sign up'} submit={handleSubmit(createAccount)} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default SignInScreen;
