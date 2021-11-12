import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight+getStatusBarHeight());
const height=windowHeight-navbarHeight;
const width = Dimensions.get('window').width;
const iosHeight = Dimensions.get('window').height;
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
// import { normalize } from "react-native-responsive-fontsize";
import * as theme from "../../Theme";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems:'center',
    },
    body:{
        flex:1,
        width:normalize(373),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent:"space-between",
        ...Platform.select({
            ios: {
                height: (iosHeight-getStatusBarHeight())-normalize(40)
            },
            android: {
             height:height-normalize(40)
            },
          }),
        marginHorizontal:normalize(20),
        marginVertical:RFValue(60,735),
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        borderTopRightRadius:100,
        // elevation:5,
    },
    circle: {
        position:"absolute",
        height: normalize(60),
        width: normalize(60),
        borderRadius: 50,
        elevation:50,
        top:RFValue(30),
        zIndex:1000,
    },
    avatar: {
        height: normalize(60),
        width: normalize(60),
    },
    logoView: {
        marginTop:normalize(40,735),
        width:normalize(170),
        height:RFValue(33,735),
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        width:normalize(170),
        height:RFValue(33,735),
        resizeMode:"contain"
    },
    loginBtn: {
        width: normalize(121),
        borderRadius: normalize(25),
        backgroundColor:"#D90000",
        height: normalize(40),
        alignItems: "center",
        justifyContent: "center",
        marginBottom:RFValue(50,735),
      
      },
    loginText:{
        fontFamily:"OpenSansCondensedBold",
        color:"#FFFFFF",
        fontSize:normalize(14),
    },
    singleBtn:{
        flexDirection:"row",
        width:normalize(338),
        height:RFValue(40,735),
        backgroundColor:theme.pink,
        borderRadius:20,
        paddingHorizontal:normalize(10),
        justifyContent:"space-between",
        alignItems:"center",
        
    },
    singlebtnText:{
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14),
        color:theme.red,
    },
    regForm:{
        width:normalize(338),
        marginTop:RFValue(43,735),
    },
    inputView: {
        backgroundColor:theme.pink,
        borderRadius: normalize(30),
        height: normalize(40),
        width:normalize(164),
        justifyContent:"center",
        marginBottom:RFValue(10,735)
    },
    TextInput: {
        width: "100%",
        height: "100%",
        paddingLeft: normalize(20),
        fontFamily:"OpenSansCondensedBold",
        color:"#FFFFFF",
        fontSize:normalize(14),
    },
    twoInputView:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    activityIndicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
});
export default styles;