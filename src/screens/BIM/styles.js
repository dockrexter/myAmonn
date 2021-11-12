import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
import * as theme from "../../Theme";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5,
    },
    docTitle:{
        fontFamily:"OpenSansCondensedBold",
        color:"#333333",
        fontSize:normalize(16,735),
    },
    amotherm:{
        fontFamily:"OpenSansCondensedLight",
        color:"#333333",
        paddingLeft:2,
        fontSize:normalize(14,735),
    },
    bottomTab:{
        flexDirection:"row",
        borderTopColor:"#D90000",
        borderTopWidth:2,
        justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor:"white",
    },
    downloadBtn:{
        justifyContent:"center",
        alignItems:"center",

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor:'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius:100,
        borderTopLeftRadius:0,
        width:normalize(376),
        height:RFValue(490,735),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: normalize(121),
        borderRadius: normalize(25),
        backgroundColor:"#D90000",
        height: normalize(40),
        alignItems: "center",
        justifyContent: "center",
        marginTop: normalize(40),
    },
    buttonOpen: {
        backgroundColor:"#D90000",
    },
    textStyle: {
        fontFamily:"OpenSansCondensedBold",
        color:"#FFFFFF",
        fontSize:normalize(14),
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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
        paddingHorizontal: normalize(20),
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

  

});
export default styles;