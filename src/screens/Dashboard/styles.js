import { Platform, StyleSheet,Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight+getStatusBarHeight());
const height=windowHeight-navbarHeight;
const width = Dimensions.get('window').width;
const iosHeight = Dimensions.get('window').height;
import { normalize } from "../../Helpers/Normalizer";


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: "white",
    },
    header:{ 
        alignItems:"center",
        backgroundColor: "white",
    },
    body:{ 
        // width:width,
        flexDirection:"row",
        paddingTop:RFValue(20,735),
        backgroundColor: "white",
        justifyContent:"space-evenly"
    },
    bodyleft:{ 
        flexDirection:"column",
        alignItems:"center",
    },
    bodyright:{ 
        flexDirection:"column",
        alignItems:"center",
    },
    footer:{
        alignItems:"center",
        marginVertical:RFValue(100,735)

    },
    logo:{
        height:RFValue(36.33,735),
        // width:width-normalize(184),
        width:normalize(230,735),
        marginVertical:RFValue(16.67,735),
    },
    Registration_button: {
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14),
        height: normalize(30),
        marginTop: normalize(30),
        textDecorationLine:"underline",
    },
   

    
  });
  export default styles;