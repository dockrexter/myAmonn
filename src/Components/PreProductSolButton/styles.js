import { Platform, StyleSheet,Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight+getStatusBarHeight());
const height=windowHeight-navbarHeight;
const width = Dimensions.get('window').width;
const iosHeight = Dimensions.get('window').height;
import * as theme from "../../Theme";
import { normalize } from "../../Helpers/Normalizer";

const styles = StyleSheet.create({
    solBtn:{
        width: normalize(208,735),
        backgroundColor:theme.grey,
        borderRadius: normalize(25,735),
        height: RFValue(40,735),
        justifyContent: "center",
        marginTop: RFValue(10,735),
        marginLeft: normalize(10,735),
    },
    soltxt:{
        fontFamily:"OpenSansCondensedLightItalic",
        fontSize:normalize(14,735),
        color:"black",
        marginLeft:normalize(10,735),
    }
});
export default styles;