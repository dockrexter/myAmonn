import React from 'react';
import {View,Animated,useWindowDimensions,StyleSheet,Dimensions} from "react-native";
// import { RFValue } from '../../Helpers/RFValuer';
import { RFValue } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Paginator = ({data,scrollX}) => {

    const {width}=useWindowDimensions();

  return (
    <View style={{flexDirection:'row',height:64}}>
        {data.map((_,i)=>{
            const inputRange=[(i-1)*width,i*width,(i+1)*width];
            const dotWidth =scrollX.interpolate({
                inputRange,
                outputRange:[10,20,10],
                extrapolate:'clamp',
            });
            const opacity =scrollX.interpolate({
                inputRange,
                outputRange:[0.3,1,0.3],
                extrapolate:'clamp',
            });
            return( 
            <Animated.View 
                style={[
                    styles.dot,{
                        width:dotWidth,
                        opacity,
                    },
                ]}
                key={i.toString()}/>)

        })}
      
    </View>
  );
};


const styles =StyleSheet.create({
  dot:{
    height:RFValue(10,735),
    borderRadius:RFValue(10,735),
    backgroundColor:'#D90000',
    marginHorizontal:RFValue(8,735),
      
  },
});

export default Paginator;