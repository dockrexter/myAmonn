import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
// import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RFValue } from "react-native-responsive-fontsize";
const numColums = 2;
// item size
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const ITEM_HEIGHT = normalize(150);
const ITEM_MARGIN = normalize(20);
const styles =StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:normalize(5)
    },
    bottomTab:{
        flexDirection:"row",
        borderTopColor:"#D90000",
        borderTopWidth:2,
        justifyContent:"space-between",
        paddingHorizontal:normalize(10),
        backgroundColor:"white",
    },
    galleryToggle:{
        flexDirection:"row",
        width:normalize(75),
        height:RFValue(40,735),
        borderRadius:normalize(25),
        marginVertical:RFValue(13,735),
        justifyContent:"space-between",
        alignItems:"center"
    },
    filterText:{
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedBold",
        color:"white",
    },
    filterBtn:{
        flexDirection:"row",
        width:normalize(100),
        height:RFValue(40,735),
        backgroundColor:"#D90000",
        borderRadius:normalize(20),
        marginVertical:RFValue(13,735),
        paddingHorizontal:normalize(15),
        justifyContent:"space-between",
        alignItems:"center"
    },
    pcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: ITEM_MARGIN,
        marginTop: normalize(5),
        width: (SCREEN_WIDTH - (numColums + 1) * ITEM_MARGIN) / numColums,
        height: ITEM_HEIGHT + normalize(40),
        borderRadius: normalize(30)
      },
    // listcontainer: {
    //     width:334,
    //     height:60,
    //     justifyContent:"flex-start",
    //     alignContent:"center",
    //     marginLeft:40,
    // },
    photo: {
        height:normalize(147),
        width:normalize(147),
        borderRadius: normalize(30),
    },
    title: {
        // flex: 1,
        fontSize:normalize(14),
        fontFamily:"OpenSansCondensedLight",
        textAlign:'left',
        color:"#333333",
        marginTop: 5,
    },
})
export default styles;