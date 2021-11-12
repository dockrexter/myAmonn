import React from "react";
import {View,Text,StyleSheet,Image,useWindowDimensions,Dimensions, PixelRatio} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
// import { RFValue } from '../../Helpers/RFValuer';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OnboardingItem= ({item})=>{
    const {width}=useWindowDimensions();
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image 
                    source={item.image}
                    style={{resizeMode:'contain'}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        flex:0.4,
        height:windowHeight,
        width:windowWidth,
        alignItems:"center",
        marginVertical:RFValue(10,735),
    },
    image:{
        // width:normalize(370),
        // height:normalize(350),
        borderBottomLeftRadius:RFValue(30,735),
        borderBottomRightRadius:RFValue(30,735),
        borderTopRightRadius:RFValue(30,735),
        overflow:"hidden",
    },
    textContainer:{
        marginTop:RFValue(30,735)
    },
    title:{
        // fontWeight:'800',
        fontFamily:'OpenSansCondensedBold',
        fontSize:normalize(32,735),
        marginBottom:RFValue(10,735),
        color:'#D90000',
        textAlign:'center',
    },
    description:{
        fontFamily:'OpenSansCondensedLight',
        fontSize:normalize(16,735),
        color:'#333333',
        textAlign:'center',
        width:normalize(300),
        marginHorizontal:normalize(30,735),
    }
});
export default OnboardingItem;