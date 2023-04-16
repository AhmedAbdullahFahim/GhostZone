import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import InputField from '../../components/authentication/InputField';
import {useNavigation} from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('VerificationScreen');
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ImageBackground
            source={require('../../assets/images/authBG.png')}
            className="flex-1"
            resizeMode="cover">
            <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-10">
              <Heading
                main={'Reset password'}
                smallMain={`Please enter your email address to request a password reset`}
              />
              <InputField type={'email'} value={email} set={setEmail} />

              <MainBtn title={'Send'} navigate={navigate} />
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
