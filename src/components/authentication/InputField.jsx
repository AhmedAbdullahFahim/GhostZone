import {TextInput, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Controller} from 'react-hook-form';

{
  /* it seems like the border colors change but they don't, it's just how they're aligned on top of the background, which is the same case in the design itself, a small workaround was to set the borderWidth to 1 except for the bottom border to 0.6 (design was 0.4 but it's too thin) */
}

const InputField = ({name, placeholder, disabled, rules, control}) => {
  const [showPassword, setShowPassword] = useState(false);

  // had to conditionally render it like this because I have to render a full view for the password since in includes the icon.
  if (placeholder.toLowerCase().includes('password')) {
    return (
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({
          field: {onChange, onBlur, value, ...renderProps},
          fieldState: {error},
        }) => (
          <View className="flex-row relative items-center mb-5">
            <TextInput
              className={`${
                error ? 'border-red-500 -mb-4' : 'border-b-[#A0A0A0] border-[#747474]'
              } w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC] border-[1px] border-b-[0.6px]`}
              placeholder={placeholder}
              keyboardType="default"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              {...renderProps}
              // onBlur={() => setShowPassword(false)}
              onBlur={() => setShowPassword(false)}
              value={value}
              // onChangeText={value => {
              //   set(value);
              //   if (value === '') setShowPassword(false);
              // }}
              onChangeText={value => {
                onChange(value);
                if (value === '') setShowPassword(false);
              }}
              placeholderTextColor={'#CCCCCC'}
            />
            <Pressable
              className={`${error ? 'h-1' : 'h-5'}`}
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
        )}
      />
    );
  }
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <TextInput
          className={`${
            error
              ? 'border-red-500 mb-1'
              : 'border-b-[#A0A0A0] border-[#747474] mb-5'
          } w-full h-14 bg-[#2A2E30] py-4 px-[18px] rounded-xl text-[#CCCCCC] border-[1px] border-b-[0.6px]`}
          placeholderTextColor={'#CCCCCC'}
          placeholder={placeholder}
          keyboardType={
            name === 'email'
              ? 'email-address'
              : name === 'phoneNumber'
              ? 'phone-pad'
              : 'default'
          }
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          editable={disabled}
        />
      )}
    />
  );
};

export default InputField;
