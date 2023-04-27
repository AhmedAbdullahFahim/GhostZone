import {View, Text} from 'react-native';
import React from 'react';
import Error from '../../assets/images/error.svg';

const ErrorMsg = ({message}) => {
  return (
    <View className="flex-row items-center mb-5">
      <Error />
      <Text className="text-sm font-bold text-[#AC3F3B] ml-1">{message}!</Text>
    </View>
  );
};

export default ErrorMsg;
