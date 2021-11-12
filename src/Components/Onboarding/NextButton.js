import React,{useEffect,useRef} from 'react';
import {View,Animated,StyleSheet,Text,Image, TouchableOpacity,Dimensions} from "react-native";
import Svg,{G,Circle} from 'react-native-svg';
// import { RFValue } from '../../Helpers/RFValuer';
import { RFValue } from 'react-native-responsive-fontsize';
import { normalize } from '../../Helpers/Normalizer';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale=windowWidth/375;
const NextButton= ({percentage, scrollTo}) => {
    const size = 120;
    const strokeWidth=2;
    const center = size/2;
    const radius =size/2 -strokeWidth/2;
    const circumference =2* Math.PI *radius;

    const progressAnimation =useRef(new Animated.Value(0)).current;
    
    const progressRef =useRef(null);

    const animation =(toValue)=>{
        return Animated.timing(progressAnimation,{
            toValue,
            duration:250,
            useNativeDriver:true
        }).start();
    }
    useEffect(()=>{
        animation(percentage);
    },[percentage]);

    useEffect(()=>{
        progressAnimation.addListener((value)=>{
            const strokeDashoffset=circumference-(circumference*value.value)/100;
            if (progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        },[percentage]);

        return()=>{
            progressAnimation.removeAllListeners()
        };
    },[]);
    
    
  return (
    <View style={styles.container}>

        <Svg width={size} height={size}>
            <G rotation="-90" origin={center}>
                <Circle 
                    stroke="#E6E7E8" 
                    cx={center} 
                    cy={center} 
                    r={radius} 
                    strokeWidth={strokeWidth}
                />
                <Circle 
                    // stroke="#F4338F" 
                    ref={progressRef}
                    stroke="#D90000"
                    cx={center} 
                    cy={center} 
                    r={radius} 
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    // strokeDashoffset={circumference-(circumference*60)/100}
                />
            </G>
        </Svg>
        <TouchableOpacity  onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
            {/* <Text>NEXT</Text> */}
            <Image  style={styles.next} source={require("../../../assets/right-arrow.png")} />
            {/* <AntDesign name="arrowright" size={32} color="#fff"/> */}
        </TouchableOpacity>
    </View>
  );
};


const styles =StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
  },
  button:{
    position:'absolute',
    backgroundColor:'#D90000',
    borderRadius:normalize(100,735),
    paddingHorizontal:RFValue(25,735),
    paddingVertical:RFValue(25,735)
  },
  next:{
    height:RFValue(15,735),
    width:RFValue(15,735)
  },
});
export default NextButton;