import { Platform, StyleSheet,Dimensions } from "react-native";
import { normalize } from "../../Helpers/Normalizer";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as theme from "../../Theme";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight+getStatusBarHeight());
const height=windowHeight-navbarHeight;
const width = Dimensions.get('window').width;
const iosHeight = Dimensions.get('window').height;
const styles=(color,width)=> StyleSheet.create({
    btn:{
        width:normalize(width),
        backgroundColor:color=="pink"?theme.pink:theme.red,
        borderRadius: normalize(25),
        height: RFValue(40,735),
        alignItems: "center",
        justifyContent: "center",
    },
    txt:{
        color:"white",
        fontSize:normalize(14,735),
        fontFamily:"OpenSansCondensedBold",
        textAlign:"center"
        
    },
});
export default styles;