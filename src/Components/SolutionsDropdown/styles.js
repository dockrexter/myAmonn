import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
const styles = StyleSheet.create({
    btn:{
        flexDirection:"row",
        width:normalize(227),
        backgroundColor:"#F7CCCC",
        borderRadius: normalize(25),
        borderWidth:normalize(0),
        height: RFValue(40,735),
        alignItems:"center",
        justifyContent:"space-between",
        alignSelf:"center",
        paddingHorizontal:normalize(10),
    },
    txt:{
        color:"white",
        fontSize:normalize(14,735),
        fontFamily:"OpenSansCondensedBold"
    },
});
export default styles;