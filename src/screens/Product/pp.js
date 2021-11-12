import React ,{ useEffect, useState,useRef }from 'react';
import {
    View,
    Text,
    // PermissionsAndroid,
    ActivityIndicator,
    Image,
    SafeAreaView,
    ImageBackground,TouchableHighlight,Modal,Pressable,Animated} from "react-native";
import styles from './styles';
import BottomTab from '../../Components/BottomTab/BottomTab';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import documents from './documents';
// import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getDocuments } from '../../Helpers/downloadDocument';
import { downloadFile } from '../../Helpers/downloadDocument';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productslist from './productslist';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';

// import { normalize } from 'react-native-responsive-fontsize';




const Product = ({route,navigation}) => {
    const [loading,setLoading]=useState(true);
    const [docs,setDocs]=useState([]);
    const [userRole,setUserRole]=useState("");
    const [shouldShowVideo,setShouldShowVideo]=useState(false);
    const [showDocuments,setShowDocuments]=useState(true);
    const [language,setLanguage]=useState("IT");
    const productFullName=route.params.name;
    const productImage=route.params.image;
    const product_line=route.params.product_line;
    const productName=productFullName.replace(/ /g,'_');
    const [downloading,setDownloading]=useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [downloadedDoc,setDownloadedDoc]= useState([]);
    const [refresh,setRefresh]=useState(false);
    var count=0;
    const scrollX=useRef(new Animated.Value(0)).current;

    const slidesRef=useRef(null);

    const viewaleItemsChanged =useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig =useRef({viewAreaCoveragePercentThreshold:50}).current;

    const scrollToNext=()=>{
        
        slidesRef.current.scrollToIndex({index:currentIndex+1});
    };
    const scrollToPrev=()=>{
        slidesRef.current.scrollToIndex({index:currentIndex-1});
    };
    const onSelectButton = button => {
        if (button=="myproduct") {
            setShowDocuments(true);
            setShouldShowVideo(false);
        }
        else{
            setShowDocuments(false);
        }
      };
    
    const lodocuments= async ()=>{
        let response = await fetch(
            'https://amonn.texus.tech/Documents?search='+productName
          );
          let json = await response.json();
          setDocs(json);
    }
    const checkLang= async ()=>{
        AsyncStorage.getItem('language').then((language)=>{
            let lang=JSON.parse(language);
            setLanguage(lang);
        })
        .catch((err)=>{
            alert(err)
        })
    }
    const zload= async()=>{
        setDownloadedDoc(await getDocuments());
    }
    const lodata=async ()=>{
        // console.log(productName);
        setLoading(true);
        await lodocuments();
        await checkLang();
        zload();
        setLoading(false);
       
      }
      useEffect(()=>{
          lodata().then((response)=>{console.log(downloadedDoc,"zinger",currentIndex);})
          
      },[refresh]);
  return (
    <View style={styles.container}>
        {/* {!loading? */}
            <View style={[styles.body,loading?{justifyContent:'center'}:null]}>
                {loading || downloading?
                    <View style={{position:"absolute",justifyContent:'center',alignItems:"center",alignSelf:'center'}}>
                        <ActivityIndicator size="large" color="#D90000" />
                    </View>
                :
                [showDocuments?
                <FlatList
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
                    data={documents}
                    style={styles.horizontallist}
                    contentContainerStyle={styles.horizontalist}
                    renderItem={({item ,index}) => {
                        const type=item.title
                        if(userRole=="normal" && item.title=="SDS" || userRole=="normal" && item.title=="TDS"){
                            // console.log(docs.filter(item=>(item.name).includes(type)));
                            // console
                            return(
                            <View style={[styles.pcontainer,index==0?{marginLeft:normalize(55)}:null,index==7?{marginRight:normalize(55)}:null]}>
                                <View style={styles.docCat}>
                                    <Text style={styles.docCatTitle}>{item.title}</Text>
                                </View>
                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={docs}
                                    renderItem={({item ,index}) => {
                                        if((item.name).includes(type)){
                                            return(
                                                <TouchableHighlight
                                                    underlayColor="none"
                                                    // onPress={()=>{checkPermission(item.name,type)}}
                                                >
                                                    <View style={styles.doccontainer}>
                                                        <Image source={require("../../../assets/myamonn-icons/file-pdf.png")} />
                                                        <Text style={styles.docname}>{item.name}</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        }
                                    }}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                    // keyExtractor={item => item.name}
                                    key={"1"} // if you want to use dynamic numColumns then you have to use key props
                                />
                            </View>)
                        }
                        else{ 
                            if(docs.filter(item=>(item.name).includes(type)).length>0){
                            count=count+1;
                            console.log(docs.filter(item=>(item.name).includes(type)).length)
                            return(
                                // ,index==0?{marginLeft:55}:null,index==count?{marginRight:55}:null
                            <View style={[styles.pcontainer,index!=0?{marginLeft:normalize(35)}:null]}>
                                <View style={styles.docCat}>
                                    <Text style={styles.docCatTitle}>{item.title}</Text>
                                </View>
                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={docs.filter(item=>(item.name).includes(type) && (item.name).includes(language))}
                                    renderItem={({item ,index}) => {
                            
                                            return(
                                                <TouchableHighlight
                                                    underlayColor="none"
                                                    onPress={()=>{
                                                        setDownloading(true);
                                                        downloadFile(item.name,type,product_line).then((responce)=>{
                                                            setDownloading(false);
                                                            setRefresh(prev=>!prev);}
                                                        );
                                                        
                                                    }}
                                                >
                                                    <View style={styles.doccontainer}>
                                                            {downloadedDoc.some(value=>value.includes(item.name))?
                                                            <Image style={{height:normalize(20),width:(20),resizeMode:"contain",right:normalize(30),top:normalize(20),zIndex:1000}}source={require("../../../assets/myamonn-icons/check.png")} />:null}
                                                            <Image source={require("../../../assets/myamonn-icons/file-pdf.png")} />                                   
                                                        <Text style={styles.docname}>{item.name}</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        
                                    }}
                                    numColumns={1}
                                    // keyExtractor={item => item.name}
                                    key={"2"} // if you want to use dynamic numColumns then you have to use key props
                                />
                            </View>
                            )}
                        }
                    }}
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    key={"3"} // if you want to use dynamic numColumns then you have to use key props
                />:

                <FlatList
                horizontal
                style={[styles.horizontallist,{alignSelf:"center"}]}
                contentContainerStyle={{justifyContent:"center",alignItems:"center"}}
                data={productslist}
                renderItem={({item ,index}) => (
                    <TouchableOpacity>
                        <View 
                            style={{ 
                                width:normalize(304),
                                height:RFValue(438,735),
                                borderRadius:normalize(40),
                                justifyContent:"center",
                                alignContent:"center",
                                marginTop:RFValue(10,735),
                                marginHorizontal:normalize(50),
                               
                                }}>
                            <ImageBackground source={require("../../../assets/balti.jpeg")} resizeMode="stretch"  style={styles.backgroundimage}>
                                <View style={styles.overlay} />
                                <Image style={styles.playButton} source={require("../../../assets/myamonn-icons/play.png")} />
                            </ImageBackground>
                        </View>
                        <Text style={{marginTop:RFValue(15,735), marginBottom:RFValue(10,735),marginHorizontal:normalize(50),fontFamily:"OpenSansCondensedLight",fontSize:normalize(14,735)}}>Tutorial {productFullName}</Text>
                    </TouchableOpacity>
                )}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                key={"1"} // if you want to use dynamic numColumns then you have to use key props
            />
                ]}
                
            </View>
            <View style={{flexDirection:"row",justifyContent:currentIndex>0?"space-between":"flex-end"}}>
                {currentIndex>0?
                <View style={{width:48,height:40,justifyContent:"center"}}>
                    <TouchableOpacity onPress={scrollToPrev}>
                        <Image style={{transform: [{ rotate: '180deg' }]}} source={require("../../../assets/myamonn-icons/next.png")}/>
                    </TouchableOpacity>
                </View>:null}
                {currentIndex<=count?
                <View style={{width:48,height:40,justifyContent:"center"}}>
                    <TouchableOpacity onPress={scrollToNext}>
                        <Image source={require("../../../assets/myamonn-icons/next.png")}/>
                    </TouchableOpacity>
                </View>:null}
            </View>
            
            <View>
                <BottomButtons
                        Buttons={2}
                        onSelectButton={onSelectButton}
                        selectionMode={"myproduct"}
                        buttonText1={"Documenti"}
                        buttonText2={"Video"}
                    /> 
                <BottomTab productImage={route.params.image} productTitle={route.params.name} product_line={product_line}/>
            </View>
    </View>
  )};

export default Product;
