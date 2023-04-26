import {
  View,
  // KeyboardAvoidingView,
  // Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {useForm} from 'react-hook-form';

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
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const navigation = useNavigation();
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState(20);
  const timerRef = useRef(time);
  const [showResend, setShowResend] = useState(true);

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    if (showVerification) {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          clearInterval(timerId);
        } else {
          setTime(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [showVerification]);

  async function verifyPhoneNumber(phoneNumber) {
    setLoading(true);
    const confirmation = await auth().verifyPhoneNumber(phoneNumber, true);
    setConfirm(confirmation);
    setShowVerification(true);
    setLoading(false);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        value,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      return userData.user;
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    } finally {
      navigation.navigate('SubscriptionPlanScreen');
    }
  }

  // console.log(loading);
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
              name="phoneNumber"
              placeholder="Phone Number"
              disabled={!showVerification}
              control={control}
            />

            {/* can't figure out everything of this thing yet, docs ain't that clear.. */}
            {showVerification && (
              <View className="mt-5 border-t pt-5 border-[#DADADA]">
                <Heading
                  smallMain={'We have sent you the verification code on'}
                  recipient={getValues('phoneNumber')}
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

            {loading ? (
              <ActivityIndicator
                style={{marginTop: 50}}
                color="#CCCCCC"
                size="large"
              />
            ) : (
              <MainBtn
                title={showVerification ? 'Continue' : 'Request OTP'}
                submit={
                  showVerification
                    ? handleSubmit(confirmCode)
                    : () =>
                        handleSubmit(
                          verifyPhoneNumber(getValues('phoneNumber')),
                        )
                }
              />
            )}

            {showVerification && showResend && (
              <View className="flex-row justify-center items-center">
                <Pressable
                  disabled={time !== 0}
                  onPress={() => {
                    handleSubmit(verifyPhoneNumber(getValues('phoneNumber')));
                    setShowResend(false);
                  }}>
                  <Text className="leading-[22px] mt-3 text-[#F8F8F8]">
                    Resend code{' '}
                  </Text>
                </Pressable>
                {time !== 0 && (
                  <Text className="mt-3 text-[#CCCCCC]/80 text-sm leading-[22px]">
                    in {time}
                  </Text>
                )}
              </View>
            )}
            <Pressable
              onPress={() => {
                auth().signOut();
              }}>
              <Text>Sign out!</Text>
            </Pressable>
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
