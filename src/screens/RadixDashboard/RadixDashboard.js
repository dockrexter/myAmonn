import React ,{ useEffect, useRef, useState }from 'react';
import {View,Dimensions,Text,TouchableHighlight,FlatList,TouchableOpacity,Image, ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './styles';
// import { normalize } from 'react-native-responsive-fontsize';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { normalize } from '../../Helpers/Normalizer';
import BottomSheet from 'reanimated-bottom-sheet';
import RadixFilter from '../../Components/BottomSheetContent/RadixFiler';
import { RFValue } from 'react-native-responsive-fontsize';
import TextTicker from 'react-native-text-ticker';
import * as theme from "../../Theme";
import { downloadFile } from '../../Helpers/downloadDocument';
import { getDocuments } from '../../Helpers/downloadDocument';
import { deleteFile } from '../../Helpers/downloadDocument';
import { openMyDocument } from '../../Helpers/downloadDocument';
const RadixDashboard = ({route,navigation}) => {
    const [radixDocuments,setradixDocuments]=useState(route.params.radixDocuments);
    const [query,setQuery]=useState("");
    const openFilter=useRef();
    const [docTypeFilter,setDocTypeFilter]=useState([]);
    const [dateFilter,setDateFilter]=useState([]);
    const [downloading,setDownloading]=useState(false);
    const [downloadedDocuments,setDownloadedDocuments]=useState([]);
    const today=new Date()

    const downloadDoc=async (name,type)=>{
        await downloadFile(name,type,"radix");
        setDownloading(false);
    }
    const settingDownlaodedDocuments=async()=>{
        setDownloadedDocuments(await getDocuments());   
    }
    useEffect(()=>{
        const setup=async ()=>{
            await settingDownlaodedDocuments();
        }
       setup();
       return()=>{
           return null;
       }
    });
    return (
    <View style={styles.container}>
        <FlatList
            data={radixDocuments.filter(docname=>dateFilter.some(date=>(docname.name).includes(date)) && docTypeFilter.some(filter=>(docname.name).includes(filter)) || dateFilter.length==0 && docTypeFilter.some(filter=>(docname.name).includes(filter)) || dateFilter.some(date=>(docname.name).includes(date)) && docTypeFilter.length==0 || docTypeFilter.length==0 && dateFilter.length==0)}
            contentContainerStyle={{
                justifyContent:"center",
                alignItems:'center',
                marginVertical:normalize(8,735)
            }}
            renderItem={({item ,index}) => {
            let q=query.toLowerCase();
            let name=String(item.name).toLowerCase();
            if(name.includes(q) || q=="" && name!=""){
                 return(
                    <TouchableHighlight
                        underlayColor="none"
                        onPress={()=>{
                            downloadedDocuments.includes(String(item.name)+"&radix")?openMyDocument(String(item.name)+"&radix"):null;
                        }}
                    >
                        
                        <View 
                            style={{ 
                                backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                width:normalize(334),
                                height:RFValue(60,735),
                                marginHorizontal:normalize(40),
                                paddingHorizontal:normalize(20),
                                justifyContent:"center",
                                alignContent:"center", }}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <View>
                                <View 
                                    style={{
                                        width:normalize(260),
                                        // alignItems:"center",
                                        // justifyContent:"center"
                                    }}
                                >
                                <TextTicker
                                    duration={9000}
                                    bounce
                                    style={{
                                        color:"#333333",
                                        fontFamily:"OpenSansCondensedBold",
                                        fontSize:normalize(16),
                                        marginLeft:normalize(5),
                                        
                                    }}>{item.name}</TextTicker>
                                </View>
                                <Text style={styles.amotherm}>{"Amotherm"}</Text>
                            </View>
                            <View style={styles.downloadBtn}>
                                {downloading?
                                    <ActivityIndicator
                                        color={theme.red}
                                        size="large"
                                    />
                                    :
                                    [downloadedDocuments.includes(String(item.name)+"&radix")?
                                    <TouchableOpacity
                                        onPress={()=>{
                                            deleteFile(String(item.name)+"&radix")
                                        }}
                                        >
                                        <Icon
                                            name={"delete"}
                                            color={"grey"}
                                            size={normalize(25)}
                                            />
                                    </TouchableOpacity>:
                                    <TouchableOpacity
                                        onPress={()=>{
                                            setDownloading(true);
                                            console.log((item.name.split("_"))[1].toLowerCase());
                                            downloadDoc(item.name,(item.name.split("_"))[1].toLowerCase());
                                        }}
                                        >
                                        <Icon
                                            name={"arrow-down-circle"}
                                            color={"grey"}
                                            size={normalize(25)}
                                            />
                                    </TouchableOpacity>]
                                }
                            </View>
                        </View>
                        </View>
                        
                    </TouchableHighlight>)}
            }}
            numColumns={1}
            key={"1"}
        />
        <BottomButtons
            Buttons={1}
            buttonText1={"My Radix"}
        />
        <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.radixLogout} 
            onPress={()=>{
                navigation.navigate("RadixLogin");
            }}
            >
            <Image source={require("../../../assets/myamonn-icons/logout.png")} />
        </TouchableOpacity>
        <SearchBar width={244} onChangeText={(query)=>setQuery(query)}/>
        <TouchableOpacity style={styles.filterBtn}
            onPress={()=>{
                openFilter.current.snapTo(1);
            }}
            >
            <Text style={styles.filterText}>FILTER</Text>
            <Icon
                name="chevron-up"
                color="white"
                size={normalize(25)}
            />
        </TouchableOpacity>
        
        </View>
        <BottomSheet
            ref={openFilter}
            snapPoints={[normalize(0), normalize(900)]}
            renderContent={()=><RadixFilter doFilter={(documentType,date)=>{
                setDocTypeFilter(documentType); 
                setDateFilter(date);
            }} 
                openFilter={openFilter}/>}
                initialSnap={0}
                enabledContentTapInteraction={false}
        />
    </View>
);};


export default RadixDashboard;

