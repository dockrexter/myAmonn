import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginHorizontal:normalize(5),
    },
    singleBtn:{
        flexDirection:"row",
        width:normalize(374),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderTopLeftRadius:20,
        borderTopRightRadius:normalize(20),
        justifyContent:"center",
        alignItems:"center"
    },
    singlebtnText:{
        color:"white",
        textAlign:"center",
        justifyContent:"center",
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(16)
    },
});
export default  styles;