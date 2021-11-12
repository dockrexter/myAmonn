import { Platform, StyleSheet,Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight+getStatusBarHeight());
const height=windowHeight-navbarHeight;
const width = Dimensions.get('window').width;
const iosHeight = Dimensions.get('window').height;


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
    
  });
  export default styles;