import { StyleSheet,Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
// import { normalize } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width > height ? width : height;

const numColums = 2;
// item size
const ITEM_HEIGHT = 150;
const ITEM_MARGIN = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5,
        justifyContent:"space-between"
        
    },
    horizontallist:{
        position: 'absolute',
        // justifyContent:"center"
    },
    horizontalist:{
      paddingHorizontal:normalize(55),
      justifyContent:"center"
  },
    docCat:{
        backgroundColor:"#D90000",
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent:"center",
        height:RFValue(40,735),
        borderRadius: normalize(25),
    },
    docCatTitle:{
        color:"white",
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(18),
    },
    pcontainer: {
        flex: 1,
        backgroundColor:"#E4E4E4",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop: RFValue(5,735),
        marginHorizontal:10,
        width: normalize(305),
        // width:SCREEN_WIDTH-110,
        height:SCREEN_HEIGHT-RFValue(130,735),
        borderRadius: normalize(30),
        paddingBottom:RFValue(150,735),
      },
    doccontainer: {
        backgroundColor:"transparent",
        alignItems:"center",
        justifyContent:"flex-start",
        marginRight:normalize(35),
        marginTop: RFValue(5,735),
        width: normalize(305),
        marginBottom:RFValue(20,735),
    },
    docname:{
        color:"#333333",
        textAlign:"center",
        width:normalize(140),
        fontFamily:"OpenSansCondensedLight",
        fontSize:normalize(14,735),
    },
      
    photo: {
        height:RFValue(557,735),
        width:normalize(147),
        borderRadius: normalize(30),
        
    },
    title: {
        flex: 1,
        fontSize: normalize(12,735),
        fontFamily:"OpenSansCondensedLight",
        textAlign:'left',
        color:"#333333",
        marginTop: RFValue(5,735),
    },
    backgroundimage:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        width:normalize(314),
        height:RFValue(450,735),
        borderRadius:normalize(40),
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
        height:RFValue(450,735)
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      
});
export default styles;