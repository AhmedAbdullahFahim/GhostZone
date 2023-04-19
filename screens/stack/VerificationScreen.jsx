import {
  View,
  // KeyboardAvoidingView,
  // Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Dash from '../../assets/images/dash.svg';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/authentication/InputField';

/* 
  flow:
    1- the user only sees the phone number field and a button
    2- user enters his phone number and presses send.
    3- the components disappears and the verification shows (conditional rendering)
  To do:
    - timer
    - user chooses his country and it sets the pre code by default (egypt: +20)
*/
const VerificationScreen = () => {
  const navigation = useNavigation();
  const [showVerification, setShowVerification] = useState(false);

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setShowVerification(true);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        value,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      navigation.navigate('SubscriptionPlanScreen');
      return userData.user;
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
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
              main={'Verification'}
              smallMain={'Please enter your phone number for verification'}
            />

            <InputField
              type={'phoneNumber'}
              value={phoneNumber}
              set={setPhoneNumber}
              disabled={!showVerification}
            />

            {/* can't figure out everything of this thing yet, docs ain't that clear.. */}
            {showVerification && (
              <View className="mt-5 border-t pt-5 border-[#DADADA]">
                <Heading
                  smallMain={'We have sent you the verification code on'}
                  recipient={phoneNumber}
                />
                <CodeField
                  ref={ref}
                  {...props}
                  rootStyle={{paddingHorizontal: 0}}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <Text
                      key={index}
                      className={`h-12 w-11 text-2xl leading-[31px] border border-[#8C8C8C] rounded-xl bg-[#2A2E30] text-[#F8F8F8] text-center p-[8px] ${
                        isFocused && 'border-[#F8F8F8]'
                      }`}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || <Dash />}
                    </Text>
                  )}
                />
              </View>
            )}
            <MainBtn
              title={showVerification ? 'Continue' : 'Request OTP'}
              submit={
                showVerification
                  ? confirmCode
                  : () => verifyPhoneNumber(phoneNumber)
              }
            />

            {/* <Pressable
              // to do: show an error modal if they don't enter the phone number
              onPress={() => phoneNumber && setShowVerification(true)}
              className="h-14 bg-[#CCCCCC] w-full mt-6 justify-center items-center rounded-xl">
              <Text className="font-bold text-base text-[#2A2E30]">Send</Text>
            </Pressable> */}

            {showVerification && (
              <View className="flex-row justify-center items-center">
                <Text className="leading-[22px] mt-3 text-[#F8F8F8]">
                  Resend code in{' '}
                </Text>
                <Text className="mt-3 text-[#CCCCCC]/80 text-sm leading-[22px]">
                  0:20
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  focusCell: {
    borderColor: '#F8F8F8',
  },
});

export default VerificationScreen;
