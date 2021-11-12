import React ,{ useEffect, useState,useRef }from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    ImageBackground,TouchableHighlight,Animated,Dimensions} from "react-native";
import styles from './styles';
import BottomTab from '../../Components/BottomTab/BottomTab';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import documents from './documents';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getDocuments } from '../../Helpers/downloadDocument';
import { downloadFile } from '../../Helpers/downloadDocument';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productslist from './productslist';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';

// import { normalize } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width > height ? width : height;
const Product = ({route,navigation}) => {
    const [loading,setLoading]=useState(true);
    const [downloadedNow,setDownloadedNow]=useState("");
    const [shouldShowVideo,setShouldShowVideo]=useState(false);
    const [showDocuments,setShowDocuments]=useState(true);
    const [docs,setDocs]=useState([]);
    const [downloadedDoc,setDownloadedDoc]= useState([]);
    const [downloading,setDownloading]=useState(false);
    const productFullName=route.params.name;
    const product_line=route.params.product_line;
    const [language,setLanguage]=useState("IT");
    const productName=productFullName.replace(/ /g,'_');
    const [token,setToken]=useState(null);
    const onSelectButton = button => {
        if (button=="myproduct") {
            setShowDocuments(true);
            setShouldShowVideo(false);
        }
        else{
            setShowDocuments(false);
        }
    };
    const getToken=()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if (token != null) {
              console.log("token",token);
              setToken(JSON.parse(token));
            }
          })
          .then(()=>{
            })
          .catch((err)=>{
            alert(err)
          })
    };
    // const checkLang= async ()=>{
    //     AsyncStorage.getItem('language').then((language)=>{
    //         let lang=JSON.parse(language);
    //         console.log(lang);
    //         setLanguage(lang);
    //     })
    //     .catch((err)=>{
    //         alert(err)
    //     })
    // };
    const lodocuments= async ()=>{
        axios.get('https://amonn.texus.tech/Documents?search='+productName, {
                        
            headers: { Authorization: `Token ${token}` }
            })
            .then(function (response) {
                console.log(response.data);
                setDocs(response.data);

            })
            .catch(function (error) {
                console.log(error,"apple");
            })
            .then(function () {
                // always executed
            });
        // let response = await fetch(
        //     'https://amonn.texus.tech/Documents?search='+productName
           
        //   );
        //   let json = await response.json();
        //   setDocs(json);
    }
    const getDownloadedDocs= async()=>{
        setDownloadedDoc(await getDocuments());
    }
    const lodata=async ()=>{
        setLoading(true);
        getToken();
        await lodocuments();
        // await checkLang();
        getDownloadedDocs();
        setLoading(false);
       
      }
      useEffect(()=>{
        lodata().then((response)=>{console.log(docs,"zinger");})
        
    },[token]);
    return (
        <View style={styles.container}>
            <View style={loading?{justifyContent:'center',marginTop:20}:null}>
                {loading?
                    <View style={{position:"absolute",justifyContent:'center',alignItems:"center",alignSelf:'center'}}>
                        <ActivityIndicator size="large" color="#D90000" />
                    </View>:
                    [showDocuments?
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            bounces={true}
                            keyExtractor={(item)=>item.id}
                            data={documents}
                            snapToInterval={SCREEN_WIDTH-88}
                            style={styles.horizontallist}
                            contentContainerStyle={styles.horizontalist}
                            renderItem={({item ,index}) => {
                                const type=item.title;
                                if(docs.filter(item=>(item.name).includes(type)).length>0)
                                return(
                                    <View style={[styles.pcontainer]}>
                                        <View style={styles.docCat}>
                                            <Text style={styles.docCatTitle}>{item.title}</Text>
                                        </View>
                                        <FlatList
                                            showsVerticalScrollIndicator={true}
                                            data={docs.filter(item=>(item.name).includes(type) && (item.name).includes(language))}
                                            renderItem={({item ,index}) => {
                                                return(
                                                    <TouchableHighlight
                                                        underlayColor="none"
                                                        onPress={()=>{
                                                            setDownloading(true);
                                                            downloadFile(item.name,type,product_line).then((responce)=>{
                                                                setDownloading(false);
                                                                setDownloadedNow(item.name);
                                                            }
                                                            );
                                                            
                                                        }}
                                                    >
                                                        <View style={styles.doccontainer}>
                                                                {downloadedDoc.some(value=>value.includes(item.name)) || downloadedNow==item.name?
                                                                <Image style={{height:normalize(20),width:(20),resizeMode:"contain",right:normalize(30),top:normalize(20),zIndex:1000}}source={require("../../../assets/myamonn-icons/check.png")} />:null}
                                                                {downloading?
                                                                <ActivityIndicator
                                                                    size="large" 
                                                                    color="#D90000"
                                                                />
                                                                :<Image source={require("../../../assets/myamonn-icons/file-pdf.png")} />}                                   
                                                            <Text style={styles.docname}>{item.name}</Text>
                                                        </View>
                                                    </TouchableHighlight>
                                                )
                                            }}
                                        
                                        />

                                    </View>
                                );
                            }}
                        />



                    :
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={true}
                        snapToInterval={SCREEN_WIDTH-15}
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
                                        marginTop:RFValue(15,735),
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
                ]
                }
            </View>
            <View>
                <BottomButtons
                        Buttons={2}
                        onSelectButton={onSelectButton}
                        selectionMode={"myproduct"}
                        buttonText1={"Documenti"}
                        buttonText2={"Video"}
                    /> 
                <BottomTab productImage={route.params.image} productTitle={route.params.name} product_line={route.params.product_line}/>
            </View>

        </View>
    );
}
export default Product;
