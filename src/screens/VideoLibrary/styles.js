import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop:5,
        // alignItems:"center",
        // justifyContent:"center"
        
    },
    bottomTab:{
        flexDirection:"row",
        borderTopColor:"#D90000",
        borderTopWidth:2,
        justifyContent:"space-evenly",
        alignItems:"center",
        paddingHorizontal:normalize(10),
        backgroundColor:"white",
    },
    bottombtns:{
        flexDirection:"row",
        justifyContent:"center",
        marginHorizontal:normalize(20),
    },
    bottomBtn:{
        flexDirection:"row",
        width:normalize(374),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingHorizontal:normalize(10),
        justifyContent:"center",
        alignItems:"center"
    },
    bottombtnText:{
        color:"white",
        textAlign:"center",
        justifyContent:"center",
        fontWeight:"bold"
    },
    filterBtn:{
        flexDirection:"row",
        width:normalize(100),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderRadius:20,
        // marginVertical:normalize(13),
        paddingHorizontal:normalize(15),
        justifyContent:"space-between",
        alignItems:"center"
    },
    
    searchText:{
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedLight",
        color:"#D90000",
    },
    filterText:{
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedBold",
        color:"white",
    },
    backgroundimage:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        width:normalize(314),
        height:RFValue(235,735),
        borderRadius:40,
        overflow: "hidden",
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: '#FFFFFF',
        width: normalize(314),
        height:RFValue(235,735)
      },
    

});
export default styles;