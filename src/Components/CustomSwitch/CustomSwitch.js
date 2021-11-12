import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { normalize } from '../../Helpers/Normalizer';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: RFValue(40,735),
          width: normalize(75),
          backgroundColor: '#F7CCCC',
          borderRadius: getRoundCorner ? 100 : 0,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? selectionColor : '#F7CCCC',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require("../../../assets/myamonn-icons/image.png")}
            />
          
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? selectionColor : '#F7CCCC',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require("../../../assets/myamonn-icons/list-bulleted.png")}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;