import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useForm} from 'react-hook-form';
import ErrorMsg from '../../components/authentication/ErrorMsg';

const ResetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

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
              main={'Reset Password'}
              smallMain={
                'Please enter your email address to request a password reset'
              }
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

            <MainBtn title={'Send'} submit={handleSubmit(onSubmit)} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
