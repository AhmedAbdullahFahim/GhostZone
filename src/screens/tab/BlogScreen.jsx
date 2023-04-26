import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

const BlogScreen = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../assets/images/backgrounds/halloweenBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="flex-1 w-full items-center justify-center bg-[#2A2E30]/70">
          <Text className="text-3xl text-white">Blog</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BlogScreen;
