import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';

/*
  to do:
    - the input field reusable but how will i get the value?
    - navigate to the same screen -if possible- so that i don't create -almost- the same screen over and over again, but with a prop that will let me know which screen i'm on.
    -transition between screens on figma is cool tbh...
    -make sure the keyboard doesn't show on top of the elements.
    -when password field is empty, setShowPassword(false)
*/

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="h-screen">
      <ImageBackground
        source={require('../assets/images/authBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="bg-[#2A2E30]/90 flex-1 px-7 pt-16">
          <Text
            className="text-[#F8F8F8] font-bold text-[28px] leading-9"
            // To be added later when I figure out how..
            // style={{fontFamily: 'Manrope'}}
          >
            Sign in
          </Text>
          <View className="flex-row space-x-1 mt-1 mb-8">
            <Text className="text-[#CCCCCC]/80 leading-[22px] font-extralight">
              Don't have an account?
            </Text>
            <Pressable>
              <Text className="text-[#F8F8F8] leading-[22px] font-bold">
                Sign up
              </Text>
            </Pressable>
          </View>
          {/* it seems like the border colors change but they don't, it's just how they're aligned on top of the background, which is the same case in the design itself, a small workaround was to set the borderWidth to 1 except for the bottom border to 0.6 (design was 0.4 but it's too thin) */}
          <TextInput
            className="w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl mb-5 text-[#CCCCCC]"
            placeholder="Email"
            placeholderTextColor={'#CCCCCC'}
            style={{
              borderTopColor: '#A0A0A0',
              borderRightColor: '#A0A0A0',
              borderLeftColor: '#A0A0A0',
              borderBottomColor: '#747474',
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 0.6,
            }}
          />
          <TextInput
            className="w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC] mb-5"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor={'#CCCCCC'}
            style={{
              borderTopColor: '#A0A0A0',
              borderRightColor: '#A0A0A0',
              borderLeftColor: '#A0A0A0',
              borderBottomColor: '#747474',
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 0.6,
            }}
          />
          <View className="flex-row relative items-center mb-3">
            <TextInput
              className="flex-1 h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC]"
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={'#CCCCCC'}
              style={{
                borderTopColor: '#A0A0A0',
                borderRightColor: '#A0A0A0',
                borderLeftColor: '#A0A0A0',
                borderBottomColor: '#747474',
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 0.6,
              }}
            />
            <Pressable
              className="h-5"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEye}
                  style={{
                    position: 'absolute',
                    right: 15,
                    color: '#8C8C8C',
                  }}
                  size={20}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{position: 'absolute', right: 15, color: '#8C8C8C'}}
                  size={20}
                />
              )}
            </Pressable>
          </View>
          <Pressable>
            <Text className="font-bold text-[#F8F8F8] leading-[22px] text-right">
              Forgot password?
            </Text>
          </Pressable>
          <Pressable className="h-14 bg-[#CCCCCC] w-full mt-6 justify-center items-center rounded-xl">
            <Text className="font-bold text-base text-[#2A2E30]">Sign in</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;
