import {View, Text, FlatList} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

const BronzeSubscriptionPlan = () => {
  const features = ['BRONZE+SILVER', 'Verified account', `Create "squads"`];
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
        paddingHorizontal: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
      colors={['#9E814860', 'transparent']}
      center={[160, 70]}
      radius={172}>
      <LinearGradient
        colors={['#E1D7C5', '#9E8148']}
        className="absolute -top-4 left-6 px-5 pt-[5px] pb-[7px] rounded-[30px] shadow-sm">
        <Text className="font-bold text-sm text-center text-white leading-[22px]">
          Gold
        </Text>
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
            129kr
          </Text>
          <Text className="text-white text-sm leading-[22px] font-normal pb-4">
            /month
          </Text>
        </View>
        <View className="px-5 pt-[5px] pb-[7px] rounded-[30px] bg-[#7D7D7D]">
          <Text className="font-[600] text-xs leading-[20px] text-center text-white">
            Locked
          </Text>
        </View>
      </View>
    </RadialGradient>
  );
};

export default BronzeSubscriptionPlan;
