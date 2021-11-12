import {StyleSheet} from 'react-native';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
const styles = StyleSheet.create({
    bottomTab:{
        flexDirection:"row",
        borderTopColor:"#D90000",
        borderTopWidth:2,
        justifyContent:"flex-start",
        backgroundColor:"#FFFFFF"
    },
    photoContainer:{
        borderRadius: normalize(20),
        marginLeft:normalize(55),
        marginRight:normalize(25),
        marginVertical:RFValue(14,735),
        shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: RFValue(8),
          },
          shadowOpacity: 0.46,
          shadowRadius: 3,

          elevation: 10,
    },
    photo: {
        height:normalize(100),
        width:normalize(100),
        borderRadius: normalize(20),
    },
    fav: {
        height:normalize(30),
        width:normalize(30),
    },
    productDetail:{
        flexDirection:"column",
        justifyContent:"space-around",
        marginVertical:RFValue(14,735)
    },
    prdCat:{
        fontSize:normalize(11),
        color:"#333333",
        fontFamily:"OpenSansCondensedLight"

    },
    prdTitle:{
        fontSize:normalize(17),
        fontWeight:"bold",
        color:"#333333",
        fontFamily:"OpenSansCondensedBold"

    }
    
});
export default styles;