import {View, Text, Pressable} from 'react-native';
import React from 'react';

const Heading = ({main, smallMain, smallBtn, navigate, recipient}) => {
  return (
    <View>
      {main && (
        <Text
          className="text-[#F8F8F8] font-bold text-[28px] leading-9"
          // To be added later when I figure out why it's not working..
          // style={{fontFamily: 'Manrope'}}
        >
          {main}
        </Text>
      )}
      <View className="flex-row space-x-1 mt-1 mb-8">
        <View>
          <Text className="text-[#CCCCCC]/80 leading-[22px] font-extralight">
            {smallMain}
          </Text>
          {recipient && (
            <Text className="text-[#CCCCCC]/80 font-extralight">
              {recipient}
            </Text>
          )}
        </View>
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
