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

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log('password ' + password);
  console.log('confirm ' + confirmPassword);

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
                main={'Create new password'}
                smallMain={`Please create a new password for your account`}
              />

              <InputField
                type={'new password'}
                value={password}
                set={setPassword}
              />
              <InputField
                type={'confirm new password'}
                value={confirmPassword}
                set={setConfirmPassword}
              />

              <MainBtn title={'Continue'} />
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;
