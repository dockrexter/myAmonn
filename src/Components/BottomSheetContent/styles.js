import { Platform, StyleSheet,Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
        marginVertical:RFValue(20,735)

    },
    radixbody:{
        paddingTop:RFValue(20,735),
        backgroundColor: "white",
        justifyContent:"space-evenly"
    },
    docbody:{
        flexDirection:"row",
        paddingTop:RFValue(20,735),
        backgroundColor: "white",
        justifyContent:"space-evenly"
    },
    Registration_button: {
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14),
        height: normalize(30),
        marginTop: normalize(30),
        textDecorationLine:"underline",
    },
    singleBtn:{
        flexDirection:"row",
        width:normalize(374),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderRadius:20,
        paddingHorizontal:normalize(10),
        justifyContent:"space-between",
        alignItems:"center",
    },
    singlebtnText:{
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14),
        color:"white",
    },
   
    
  });
  export default styles;