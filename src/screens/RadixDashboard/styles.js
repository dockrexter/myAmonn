import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
import * as theme from "../../Theme";
import { normalize } from "../../Helpers/Normalizer";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5,
    },
    downloadBtn:{
        justifyContent:"center",
        alignItems:"center",

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
        justifyContent:"space-between",
        paddingHorizontal:normalize(10),
        backgroundColor:"white",
    },
  
    filterBtn:{
        flexDirection:"row",
        width:normalize(100),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderRadius:20,
        marginVertical:RFValue(13,735),
        paddingHorizontal:normalize(15),
        justifyContent:"space-between",
        alignItems:"center"
    },
    filterText:{
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedBold",
        color:"white",
        fontWeight:'700'
    },
    galleryToggle:{
        flexDirection:"row",
        width:normalize(75),
        height:RFValue(40,735),
        borderRadius:25,
        marginVertical:RFValue(13,735),
        justifyContent:"space-between",
        alignItems:"center"
    },
    radixLogout:{
        backgroundColor:theme.red,
        marginVertical:RFValue(13,735),
        width:normalize(40),
        height:normalize(40),
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
    },

});
export default styles;