import React,{useEffect,useState} from "react";
import {Text, View, TouchableOpacity,Image} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
// import { normalize } from "react-native-responsive-fontsize";
import * as theme from "../../Theme";
import { normalize } from "../../Helpers/Normalizer";
import { RFValue } from "react-native-responsive-fontsize";
import TextTicker from 'react-native-text-ticker'

const SolutionsDropdown=({name,data,selectedDropdownName,onPress,filter,productLine,getFilter})=>{
    const [open,setOpen]=useState(false);
    const [select,setSelect]=useState("");
    useEffect(()=>{
        if(selectedDropdownName==""){
            setOpen(false);
        }
    });
    if((selectedDropdownName==name || selectedDropdownName=="") && name!="Pratika")
    return(
        <View
            style={open?{
                borderColor:"#D90000",
                marginTop:RFValue(10,735),
                borderTopWidth:0,
                borderWidth:2,
                width:normalize(227),
                borderRadius:20,
                paddingBottom:10,
                
            }:{marginTop:RFValue(10,735)}}
        >
        <TouchableOpacity
            onPress={()=>{
                if(productLine!="Bessemer"){
                    setOpen(prev=>!prev);
                    onPress();
                }
                else{
                    let obj=filter
                    let array=[...obj[productLine]]
                    if(!array.includes(name)){
                        setSelect(name);
                        array.push(name);
                        obj[productLine]=array;
                    }
                    else{
                        let i=array.indexOf(name);
                        array.splice(i, 1);
                        setSelect(prev=>!prev);
                        obj[productLine]=array;
                    }
                    getFilter(obj);
                }
            }}
            style={[styles.btn,open || filter[productLine].includes(name) || select==name ?{backgroundColor:"#D90000"}:null]}>
            {productLine!="Bessemer"?
                <View style={{width:normalize(150)}}>
                <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.txt}>
                    {name}{" ("+data.filter(item=>filter[productLine].includes(item.name)).length+")"}</TextTicker>
                </View>
                :
                <View style={{width:normalize(150)}}>
                <TextTicker
                    duration={3000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}
                    style={styles.txt}>{name}</TextTicker>
                </View>
                }
            {data?
            <Icon
                name={open?"chevron-up":"chevron-down"}
                color="white"
                size={normalize(25)}
            />
            :null}
        </TouchableOpacity>
        {open?
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                style={{
                    width:normalize(227),
                    height:RFValue(150,735),
                }}
                renderItem={({item ,index}) => (
                    <TouchableOpacity
                        style={{
                            flexDirection:"row",
                            width:normalize(215),
                            backgroundColor:filter[productLine].includes(item.name) || select==item.name ?theme.pink:((index+1)%2)!=0?"#F2F2F2":"white",
                            borderRadius: normalize(25),
                            // borderWidth:0,
                            height: RFValue(40,735),
                            alignItems:"center",
                            justifyContent:"space-between",
                            paddingHorizontal:normalize(10,735),
                            marginHorizontal:2,
                            marginVertical:2
                        }}
                        onPress={()=>{
                            let obj=filter
                            let array=[...obj[productLine]]
                            if(!array.includes(item.name)){
                                setSelect(item.name);
                                array.push(item.name);
                                obj[productLine]=array;
                            }
                            else{
                                let i=array.indexOf(item.name);
                                array.splice(i, 1);
                                setSelect(prev=>!prev);
                                obj[productLine]=array;
                            }
                            getFilter(obj);
                        }}
                        >
                        <Text style={{
                            color:filter[productLine].includes(item.name)?"white":"black",
                            fontSize:normalize(14),
                            fontFamily:"OpenSansCondensedLight"
                        }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                numColumns={1}
                keyExtractor={item=>item.name}
            />:null}
        </View>
    );
    else return null;
}
export default SolutionsDropdown;
