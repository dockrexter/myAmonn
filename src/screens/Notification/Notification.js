import React ,{ useEffect, useRef, useState }from 'react';
import {View,Dimensions,Text,TouchableHighlight,FlatList,TouchableOpacity,Image, ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './styles';
// import { normalize } from 'react-native-responsive-fontsize';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import Swipeout from 'react-native-swipeout';
import TextTicker from 'react-native-text-ticker';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
import * as theme from "../../Theme";
import { deleteFile } from '../../Helpers/downloadDocument';

const Notifications = ({route,navigation}) => {
    const [type,setType]=useState("Unread")
    const onSelectButton = (button) => {
        if (button=="myproduct") {
            console.log("Unread");
            setType("Unread");
        }
        else{
            console.log("all");
            setType("all");
        }
      };
      var swipeoutBtns = [
        {
            
            backgroundColor:"transparent",
            component:<View style={{ flex:1,justifyContent:"center",alignItems:"center"}}><Icon
                name={"delete"}
                color={"grey"}
                size={normalize(25)}
                /></View>,
        },
      ]
    return (
        <View style={styles.container}>
            <FlatList
                data={["Discover the new Amotherm Brick WB","Discover the new Amotherm Brick WB","Discover the new Amotherm Brick WB"]}
                contentContainerStyle={{
                    justifyContent:"center",
                    alignItems:'center',
                    marginVertical:normalize(7,735)
                }}
                renderItem={({item ,index}) => (
                    <Swipeout 	
                        backgroundColor="transparent"
                        right={swipeoutBtns}>
                        <TouchableHighlight
                            underlayColor="none"
                        
                        >
                            <View 
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                    width:normalize(334),
                                    height:normalize(80,735),
                                    justifyContent:"center",
                                    borderLeftWidth:type=="Unread"?2:null,
                                    borderLeftColor:type=="Unread"?"#FFB300":null
                                    // alignContent:"center",
                                }}
                            >   
                            <View style={{flexDirection:"row",marginHorizontal:normalize(20)}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={require("../../../assets/myamonn-icons/video-library.png")}/>
                                </View>
                                <View 
                                    style={{
                                        width:normalize(261),
                                    }}
                            

                                >
                                <Text style={{marginLeft:normalize(15),fontFamily:"OpenSansCondensedLightItalic",fontSize:normalize(14)}}>
                                    {"20/06/2021 09:11"}
                                </Text>
                                <TextTicker
                                    duration={3000}
                                    style={{
                                        color:"#333333",
                                        fontFamily:"OpenSansCondensedBold",
                                        fontSize:normalize(16),
                                        marginLeft:normalize(15),
                                        
                                    }}>
                                        
                                        {item}
                                </TextTicker>
                                </View>
                            </View>
                            </View>
                        </TouchableHighlight>
                    </Swipeout>
                )}
                keyExtractor={(item,index)=>index.toString()}
                numColumns={1}
                key={"3"} // if you wan

            />
            <BottomButtons
                Buttons={2}
                onSelectButton={onSelectButton}
                selectionMode={"myproduct"}
                buttonText1={"Unread"}
                buttonText2={"All Notifications"}
            />

        </View>
    )

}
export default Notifications;