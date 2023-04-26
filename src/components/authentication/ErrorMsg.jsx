import {View, Text} from 'react-native';
import React from 'react';

const ErrorMsg = ({message}) => {
  return <Text className='text-sm font-bold text-red-500 mb-5'>{message}</Text>;
};

export default ErrorMsg;
