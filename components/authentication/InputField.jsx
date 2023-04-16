import {TextInput, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';

{
  /* it seems like the border colors change but they don't, it's just how they're aligned on top of the background, which is the same case in the design itself, a small workaround was to set the borderWidth to 1 except for the bottom border to 0.6 (design was 0.4 but it's too thin) */
}

const InputField = ({type, value, set}) => {
  const [showPassword, setShowPassword] = useState(false);
  if (type.includes('password')) {
    return (
      <View className="flex-row relative items-center mb-3">
        <TextInput
          className="w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC] border-[1px] border-b-[0.6px] border-b-[#A0A0A0] border-[#747474]"
          placeholder={
            type === 'password'
              ? 'Password'
              : type === 'new password'
              ? 'New password'
              : 'Confirm new password'
          }
          keyboardType="default"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => setShowPassword(false)}
          name={type}
          value={value}
          onChangeText={value => {
            set(value);
            if (value === '') setShowPassword(false);
          }}
          placeholderTextColor={'#CCCCCC'}
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
    );
  }
  return (
    <TextInput
      className="w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl mb-5 text-[#CCCCCC] border-[1px] border-b-[0.6px] border-b-[#A0A0A0] border-[#747474] "
      placeholderTextColor={'#CCCCCC'}
      placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
      keyboardType={
        type === 'email'
          ? 'email-address'
          : type === 'phone number'
          ? 'phone-pad'
          : 'default'
      }
      name={type}
      value={value}
      onChangeText={value => set(value)}
    />
  );
};

export default InputField;
