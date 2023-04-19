import {View, Text, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation()
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../../assets/images/backgrounds/halloweenBG.png')}
        className="flex-1"
        resizeMode="cover">
        <View className="flex-1 w-full items-center justify-center bg-[#2A2E30]/70">
          <Text className="text-3xl text-white">
            Welcome home {route.params.name}
          </Text>
          <Pressable
            onPress={() => {
              auth().signOut();
              navigation.navigate('SignInScreen')
            }}>
            <Text>Sign out!</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
