import React, {useState} from 'react';
import styles from './styles';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { normalize } from '../../Helpers/Normalizer';

const BottomButtons=({
    Buttons,
    onSelectButton,
    selectionMode,
    buttonText1,
    buttonText2})=>{
    const [getButtons, setButtons] = useState(Buttons);
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const updatedButtonData = val => {
        setSelectionMode(val);
        onSelectButton(val);
      };
    return(
        <View>
        {getButtons==2?(
        <View style={styles.container}>
            <TouchableOpacity style={{
                flexDirection:"row",
                width:normalize(179),
                height:RFValue(40,735),
                borderWidth:2,
                borderBottomWidth:0,
                borderColor:"#D90000",
                backgroundColor:getSelectionMode=="mydocuments"?"#F2F2F2":"#D90000",
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                paddingHorizontal:normalize(10),
                justifyContent:"center",
                alignItems:"center"
                }}
                onPress={()=>{
                    updatedButtonData("myproduct");
                }}>
                <Text style={{
                    color:getSelectionMode=="mydocuments"?"#D90000":"white",
                    textAlign:"center",
                    justifyContent:"center",
                    fontFamily:"OpenSansCondensedBold"
                }}>{buttonText1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                flexDirection:"row",
                width:normalize(179),
                height:RFValue(40,735),
                borderWidth:2,
                borderBottomWidth:0,
                borderColor:"#D90000",
                backgroundColor:getSelectionMode=="mydocuments"?"#D90000":"#F2F2F2",
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                paddingHorizontal:normalize(10),
                justifyContent:"center",
                alignItems:"center"
                }}
                onPress={()=>{
                    updatedButtonData("mydocuments");
                }}>
                <Text style={{
                    color:getSelectionMode=="mydocuments"?"white":"#D90000",
                    textAlign:"center",
                    justifyContent:"center",
                    fontFamily:"OpenSansCondensedBold"
                }}>{buttonText2}</Text>
            </TouchableOpacity>
        </View>):
        <View style={styles.container}>
        <TouchableOpacity style={styles.singleBtn}>
            <Text style={styles.singlebtnText}>{buttonText1}</Text>
        </TouchableOpacity>

        </View>
        }
        </View>
    );

};
export default BottomButtons;


