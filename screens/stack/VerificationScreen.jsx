import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../components/authentication/Heading';
import MainBtn from '../../components/authentication/MainBtn';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Dash from '../../assets/images/dash.svg';

const VerificationScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const navigate = () => {
    navigation.navigate('CreateNewPassword');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ImageBackground
            source={require('../../assets/images/backgrounds/authBG.png')}
            className="flex-1"
            resizeMode="cover">
            <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-10">
              <Heading
                main={'Verification'}
                smallMain={`We've sent you the verification code on`}
                recipient={'mail@org.com'}
              />

              {/* can't figure out everything of this thing yet, docs ain't that clear.. */}
              <CodeField
                ref={ref}
                {...props}
                rootStyle={{paddingHorizontal: 14}}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    className={`h-14 w-14 text-2xl leading-[31px] border border-[#8C8C8C] rounded-xl bg-[#2A2E30] text-[#F8F8F8] text-center p-[11px] ${
                      isFocused && 'border-[#F8F8F8]'
                    }`}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || <Dash color={'#'} />}
                  </Text>
                )}
              />

              <MainBtn title={'Continue'} navigate={navigate} />

              <View className="flex-row justify-center items-center">
                <Text className="leading-[22px] mt-3 text-[#F8F8F8]">
                  Resend code in{' '}
                </Text>
                <Text className="mt-3 text-[#CCCCCC]/80 text-sm leading-[22px]">
                  0:20
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  focusCell: {
    borderColor: '#F8F8F8',
  },
});

export default VerificationScreen;
