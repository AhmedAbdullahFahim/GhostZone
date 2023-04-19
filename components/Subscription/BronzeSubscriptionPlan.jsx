import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const BronzeSubscriptionPlan = () => {
  const navigation = useNavigation();
  const features = ['Basic features', '3 devices'];
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#484948', '#635a52', '#484948']}
      className="w-full h-[140px] border border-b-[0.6px] border-[#747474] border-b-[#A0A0A0] mb-8 rounded-[20px] text-white relative flex-row items-center px-7">
      <LinearGradient
        colors={['#C9A078', '#C9A078', '#635a52']}
        className="absolute -top-4 left-6 px-5 pt-[5px] pb-[7px] rounded-[30px] shadow-sm ">
        <Text className="font-bold text-sm text-center text-white">Bronze</Text>
      </LinearGradient>
      <FlatList
        data={features}
        renderItem={({item}) => (
          <Text className="text-[#F8F8F8] text-sm leading-[22px] max-w-[141px]">{`\u2022 ${item}`}</Text>
        )}
      />
      <View>
        <View className="flex-row">
          <Text className="text-[20px] leading-7 font-bold text-white">
            69kr
          </Text>
          <Text className="text-white text-sm leading-[22px] font-normal pb-4">
            /month
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('HomeTabScreen')}>
          <LinearGradient
            colors={['#C9A078', '#C9A078', '#635a52']}
            className="px-5 pt-[5px] pb-[7px] rounded-[30px]">
            <Text className="font-[600] text-[12px] leading-[20px] text-center text-white">
              Subscribe
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default BronzeSubscriptionPlan;
