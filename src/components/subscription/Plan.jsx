import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import {useNavigation} from '@react-navigation/native';

const Plan = ({item, index}) => {
  const {type, price, features, radial, linear} = item;

  const navigation = useNavigation();

  return (
    <RadialGradient
      style={{
        width: '100%',
        height: 140,
        borderWidth: 1,
        borderBottomWidth: 0.6,
        borderColor: '#747474',
        borderBottomColor: '#A0A0A0',
        marginBottom: 32,
        borderRadius: 20,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
      colors={radial}
      center={[160, 70]}
      radius={172}>
      <LinearGradient
        colors={linear}
        className="absolute -top-4 left-6 h-fit w-fit px-5 pt-[5px] pb-[7px] rounded-[30px] shadow-sm">
        <Text className="font-bold text-sm text-center text-white">{type}</Text>
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
            {price}
          </Text>
          <Text className="text-white text-sm leading-[22px] font-normal pb-4">
            /month
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('HomeTabScreen')}>
          <LinearGradient
            colors={index === 2 ? ['#7D7D7D', '#7D7D7D'] : linear}
            className="px-5 pt-[5px] pb-[7px] rounded-[30px]">
            <Text className="font-[600] text-[12px] leading-[20px] text-center text-white">
              Subscribe
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </RadialGradient>
  );
};

export default Plan;
