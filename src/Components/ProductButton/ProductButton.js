import React,{useEffect,useRef,useState} from "react";
import {Text,TouchableOpacity} from 'react-native';
import styles from "./styles";

const ProductButton=({productName,color,onPress,onLongPress,width})=>{
    
    useEffect(()=>{
    },[]);
    return(
        <TouchableOpacity 
            // onPress={()=>{
            //     let list=[...selected]
            //     list.fill(false);
            //     list[id]=true;
            //     setSelected(list);
            //     onPress();
            // }}
            activeOpacity={0.6}
            onPress={()=>{
                onPress();
            }}
            onLongPress={()=>{
                onLongPress();
            }}
            style={styles(color,width).btn}>
            <Text style={styles(color,width).txt}>{productName}</Text>
        </TouchableOpacity>
    );
}
export default ProductButton;
// ,{backgroundColor:selected[id]?"#D90000":"#F7CCCC"}