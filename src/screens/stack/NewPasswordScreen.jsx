import {
  View,
  // KeyboardAvoidingView,
  // Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useForm} from 'react-hook-form';
import ErrorMsg from '../../components/authentication/ErrorMsg';

const NewPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const pwd = watch('password');

  const onSubmit = data => {
    if (isValid) {
      console.log(data);
    }
  };

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
              main={'Create new password'}
              smallMain={`Please create a new password for your account`}
            />

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

            <MainBtn title={'Continue'} submit={handleSubmit(onSubmit)} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;
