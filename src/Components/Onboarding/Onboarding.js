import React,{useState,useRef} from "react";
import {View,ImageBackground,Text,StyleSheet,FlatList,Animated,SafeAreaView,Platform,StatusBar} from "react-native";
import slides from './slides';
import OnboardingItem from "./OnboardingItem";
import Paginator from "./paginator";
import NextButton from "./NextButton";
import { normalize } from "../../Helpers/Normalizer";
import { RFValue } from "react-native-responsive-fontsize";


const Onboarding = ({navigation})=>{
    const [currentIndex,setCurrentIndex] = useState(0);
    
    const scrollX=useRef(new Animated.Value(0)).current;

    const slidesRef=useRef(null);

    const viewaleItemsChanged =useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig =useRef({viewAreaCoveragePercentThreshold:50}).current;

    const scrollTo=()=>{
        if(currentIndex<slides.length-1){
            slidesRef.current.scrollToIndex({index:currentIndex+1});
        }
        else{
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../../assets/right-arrow.png")} style={styles.image}>
            <View style={{flex:3}}>
                <FlatList 
                    data={slides} 
                    renderItem={({item})=> <OnboardingItem item={item}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item)=>item.id}
                    onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
                        useNativeDriver:false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewaleItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    key={"8"}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX}/>
            <NextButton  scrollTo={scrollTo} percentage={(currentIndex+1)*(100/slides.length)}/>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-around",
        alignItems:"center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flexDirection:'column',
        marginVertical:RFValue(10,735),
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        alignItems:"center",
        justifyContent: 'center',
      },
});
export default Onboarding;