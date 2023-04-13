import {TextInput, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const InputField = ({type, value, set}) => {
  const [showPassword, setShowPassword] = useState(false);
  if (type === 'password') {
    return (
      <View className="flex-row relative items-center mb-3">
        <TextInput
          className="flex-1 h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC]"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          value={value}
          onChangeText={value => {
            set(value);
            if (value === '') setShowPassword(false);
          }}
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
    );
  }
  return (
    <TextInput
      className="w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl mb-5 text-[#CCCCCC]"
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
  );
};

export default InputField;
