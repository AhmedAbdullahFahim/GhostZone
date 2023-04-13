import {View, Text, Pressable} from 'react-native';
import React from 'react';

const Heading = ({main, smallMain, smallBtn, navigate}) => {
  return (
    <View>
      <Text
        className="text-[#F8F8F8] font-bold text-[28px] leading-9"
        // To be added later when I figure out how..
        // style={{fontFamily: 'Manrope'}}
      >
        {main}
      </Text>
      <View className="flex-row space-x-1 mt-1 mb-8">
        <Text className="text-[#CCCCCC]/80 leading-[22px] font-extralight">
          {smallMain}
        </Text>
        {smallBtn && (
          <Pressable onPress={navigate}>
            <Text className="text-[#F8F8F8] leading-[22px] font-bold">
              {smallBtn}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Heading;
