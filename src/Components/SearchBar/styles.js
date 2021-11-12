import { Platform, StyleSheet,Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { normalize } from "../../Helpers/Normalizer";

import * as theme from "../../Theme";

const styles =(w)=> StyleSheet.create({
    searchBtn:{
        flexDirection:"row",
        height:RFValue(40,735),
        // width:width-RFValue(160),
        width:normalize(w),
        borderWidth:2,
        borderColor:theme.red,
        borderRadius:normalize(25),
        marginVertical:RFValue(14,735),
        paddingHorizontal:normalize(10),
        justifyContent:"space-between",
        alignItems:"center"
    },
    searchText:{
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedBold",
        color:theme.red,
        height:RFValue(40,735),
        // width:width-RFValue(160),
        width:normalize(w)
    },
});

export default styles;