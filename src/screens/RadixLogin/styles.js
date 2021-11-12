import { StyleSheet } from "react-native";
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
        backgroundColor: theme.red,
        alignItems: "center",
        height:RFValue(630,735),
        marginHorizontal:normalize(20),
        marginVertical:RFValue(40,735),
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        borderTopRightRadius:100,
        elevation:5,
    },
    circle: {
        position:"absolute",
        height: normalize(100),
        width: normalize(100),
        borderRadius: 50,
        elevation:50,
        top:0,
        zIndex:1000,
    },
    avatar: {
        height: normalize(100),
        width: normalize(100),
    },
    logoView: {
        marginTop:normalize(66,735),
        width:normalize(159),
        height:RFValue(25,735),
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        width:normalize(159),
        height:RFValue(25,735),
        resizeMode:"contain"
    },
    radixText:{
        marginTop:RFValue(119,735),
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(17),
        color:"white",
    },
    inputView: {
        backgroundColor: theme.pink,
        borderRadius: normalize(30),
        width:"70%",
        height: RFValue(40,735),
        marginTop:RFValue(10,735),
        alignItems: "center",
        justifyContent:"center",
    },

    TextInput: {
        height: RFValue(50,735),
        width:"100%",
        flex: 1,
        padding: normalize(10,735),
        textAlign:"center",
        color:"white",
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14,735),
  },
  RgBtn: {
    width: "35%",
    borderRadius: normalize(30),
    height: RFValue(40,735),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(20),
    backgroundColor: "white",
  },
  RgText:{
      color:"#D90000",
      fontFamily:"OpenSansCondensedBold",
      fontSize:normalize(14,735),
  },
  bottomText:{
      marginTop:RFValue(83,735),
      color:"white",
      textAlign:"center",
      fontFamily:"OpenSansCondensedBold",
      fontSize:normalize(11,735),
      lineHeight:normalize(13,735),
      
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
});
export default styles;