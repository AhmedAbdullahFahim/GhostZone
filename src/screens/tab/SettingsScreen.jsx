import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

const SettingsScreen = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../assets/images/backgrounds/halloweenBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="flex-1 items-center justify-center w-full bg-[#2A2E30]/70">
          <Text className="text-3xl text-white">Settings</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SettingsScreen;
