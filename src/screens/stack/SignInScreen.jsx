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

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate('SignUpScreen');
  };

  async function signIn() {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('SubscriptionPlanScreen');
    } catch (error) {
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
              main={'Sign in'}
              smallMain={`Don't have an account?`}
              smallBtn={'Sign up'}
              navigate={navigate}
            />
            <InputField type={'email'} value={email} set={setEmail} />
            <InputField type={'password'} value={password} set={setPassword} />

            <Pressable onPress={() => navigation.navigate('Reset')}>
              <Text className="font-bold text-[#F8F8F8] leading-[22px] text-right">
                Forgot password?
              </Text>
            </Pressable>
            <MainBtn title={'Sign in'} submit={signIn} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default SignInScreen;
