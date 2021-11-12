import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
import * as theme from "../../Theme";
import { normalize } from "../../Helpers/Normalizer";
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        height:RFValue(600,735),
        marginTop:35,
    },
    profileDescription:{
        height:RFValue(40,735),
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    username:{
        color:theme.red,
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(16),
    },
    userType:{
        color:theme.red,
        fontFamily:"OpenSansCondensedLight",
        fontSize:normalize(14),
    },
    body:{
        justifyContent:"space-evenly",
        alignItems:"center",
    },
    editButton:{
        elevation:20,
        flexDirection:"row",
        backgroundColor:"white",
        height:RFValue(46,735),
        width:(376),
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:normalize(19),
        borderRadius:35,
        marginTop:RFValue(25,735)
    },
    editButtonText:{
        color:"#333333",
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(16),
    },
    contact:{
        color:theme.red,
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(11),
        textAlign:"justify"
    },
    formBody:{
        elevation:30,
        width:normalize(376),
        height:RFValue(291,735),
        marginTop:RFValue(25,735),
        borderRadius:41,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    },
    regForm:{
        width:normalize(338),
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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default styles;