import React,{useState,useEffect}from 'react';
import {View,Text,Image,Dimensions,SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import slides from '../Onboarding/slides';
import ProductButton from '../ProductButton/ProductButton';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PreProductSolButton from '../PreProductSolButton/PreProductSolButton';
import SolutionsDropdown from '../SolutionsDropdown/SolutionsDropdown';
import { getSolutions } from '../../Helpers/getSolutions';
import { normalize } from '../../Helpers/Normalizer';
import documents from '../../screens/Product/documents';
import { RFValue } from 'react-native-responsive-fontsize';
import CalendarPicker from 'react-native-calendar-picker';


const RadixFilter=({doFilter,openFilter})=>{
    // const [productLine,setProductLine]=useState([]);
    // const [documentType,setdocumentType]=useState([]);
    const [documentTypeFilter,setdocumentTypeFilter]=useState([]);
    const documentleft=["ORDINE","FATTURA","CONDIZIONI"];
    const documentright=["DDT","OFFERTA","ACCREDITO"];
    const [open,setOpen]=useState(false);
    const [selectedFilteraPer,setSelectedFilteraPer]=useState("Personalizzato");
    const filteraPerData=["Personalizzato","Oggi","Leri","Ultimi 7 giorni","Ultimi 14 giorni","Ultimi 30 giorni","Ultimi 90 giorni"]
    const [date,setDate]=useState([]);
    const dd=new Date();
    const today=new Date(new Date().setDate(dd.getDate()-0));
    const yesterday=new Date(new Date().setDate(dd.getDate()-1));
    const satdays=new Date(new Date().setDate(dd.getDate()-7));
    
    const dateConveter=(dat)=>{
        var arrayDate=String(dat).split(" ");
        var newDate=arrayDate[3]+"-"+("0"+(["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(arrayDate[1])+1)).slice(-2)+"-"+arrayDate[2];
        return newDate;
    }

    function onDateChange(dat) {
       setDate([dateConveter(dat)]);
      }
    const setDateFilters=(item)=>{
        setSelectedFilteraPer(item);
        setOpen(prev=>!prev);
        if(item=="Oggi"){
            setDate([dateConveter(today)]);
            console.log(date);
        }
        else if(item=="Leri"){
            setDate([dateConveter(yesterday)]);
            console.log(date);
        }
        else if(item=="Ultimi 7 giorni"){
            let days=[];
            for(var i=0; i<=7; i++){
                days[i]=(dateConveter(new Date(new Date().setDate(dd.getDate()-i))));
            }
            setDate(days);
            console.log(date);
        }
        else if(item=="Ultimi 14 giorni"){
            let days=[];
            for(var i=0; i<=14; i++){
                days[i]=(dateConveter(new Date(new Date().setDate(dd.getDate()-i))));
            }
            setDate(days);
            console.log(date);
        }
        else if(item=="Ultimi 30 giorni"){
            let days=[];
            for(var i=0; i<=30; i++){
                days[i]=(dateConveter(new Date(new Date().setDate(dd.getDate()-i))));
            }
            setDate(days);
            console.log(date);
        }
        else if(item=="Ultimi 90 giorni"){
            let days=[];
            for(var i=0; i<=90; i++){
                days[i]=(dateConveter(new Date(new Date().setDate(dd.getDate()-i))));
            }
            setDate(days);
            console.log(date);
        }
        
    }

    useEffect(()=>{
    })
    return(
        <SafeAreaView style={
            {
                height: normalize(900),
            }}>    
            <View 
                style={{
                    borderBottomWidth:2,
                    borderBottomColor:"red",
                    alignItems:"center",
                    justifyContent:"flex-end",
                    backgroundColor:'rgba(52, 52, 52, 0.8)',
                    height: normalize(250),
                    }}>
                <Icon
                    name="reorder-horizontal"
                    color="red"
                    size={25}/>
            </View>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingBottom:0,
                    height: normalize(650),
                }}>
                <View style={styles.radixbody}>
                    <Text
                        style={{
                            fontFamily:"OpenSansCondensedLight",
                            fontSize:normalize(16,735),
                            color:"#333333",
                            alignSelf:'center'
                        }}
                        >Document Type</Text>
                    <View style={styles.docbody}>
                        <View style={styles.bodyleft}>
                            <FlatList
                                data={documentleft}
                                renderItem={({item ,index}) => (
                                    <View style={{paddingTop:RFValue(10,735)}}>
                                        <ProductButton
                                            width={174}
                                            color={documentTypeFilter.includes(item.toUpperCase())?"red":"pink"}
                                            productName={item.toUpperCase()}
                                            onPress={()=>{
                                                let array=[...documentTypeFilter];
                                                if(array.includes(item)){
                                                    const index=array.indexOf(item);
                                                    if (index > -1) {
                                                        array.splice(index, 1);
                                                      }
                                                }
                                                else{
                                                    array.push(item);
                                                }
                                                setdocumentTypeFilter(array);
                                            }}
                                        />

                                    </View>
                                )}
                            />
                        </View>
                        <View style={styles.bodyright}>
                            <FlatList
                                data={documentright}
                                renderItem={({item ,index}) => (
                                    <View style={{paddingTop:RFValue(10,735)}}>
                                        <ProductButton
                                            width={174}
                                            color={documentTypeFilter.includes(item.toUpperCase())?"red":"pink"}
                                            productName={item.toUpperCase()}
                                            onPress={()=>{
                                                let array=[...documentTypeFilter];
                                                if(array.includes(item)){
                                                    const index=array.indexOf(item);
                                                    if (index > -1) {
                                                        array.splice(index, 1);
                                                      }
                                                }
                                                else{
                                                    array.push(item);
                                                }
                                                setdocumentTypeFilter(array);
                                            }}
                                            
                                        />

                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{paddingTop:RFValue(10,735)}}>
                        <Text
                            style={{
                                fontFamily:"OpenSansCondensedLight",
                                fontSize:normalize(16,735),
                                color:"#333333",
                                alignSelf:'center'
                            }}
                            >Filtera per</Text>
                    </View>
                    <View style={styles.docbody}>
                    <View style={styles.bodyleft}>
                    <SafeAreaView
                        style={open?{
                            borderTopWidth:0,
                            borderColor:"#D90000",
                            borderWidth:2,
                            width:selectedFilteraPer!="Personalizzato"?normalize(374):normalize(174),
                            borderRadius:20,
                            backgroundColor:"white",
                        }:null}
                     >
                    <TouchableOpacity
                        onPress={()=>setOpen(prev=>!prev)}
                        style={[styles.singleBtn,{width:selectedFilteraPer!="Personalizzato"?normalize(374):normalize(174)},open?{backgroundColor:"#D90000"}:null]}>
                        <Text style={styles.singlebtnText}>{selectedFilteraPer}</Text>
                        <Icon
                            name={open?"chevron-down":"chevron-up"}
                            color="white"
                            size={normalize(25)}
                        />
                    </TouchableOpacity>
                    {open?
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filteraPerData}
                            style={{
                                width:selectedFilteraPer!="Personalizzato"?normalize(374):normalize(174),
                                height:RFValue(160,735),
                                marginVertical:RFValue(10,735),
                            }}
                            
                            renderItem={({item ,index}) => (
                                
                                <TouchableOpacity
                                    style={{
                                        flexDirection:"row",
                                        width:selectedFilteraPer!="Personalizzato"?normalize(360):normalize(160),
                                        backgroundColor:selectedFilteraPer==item?"#D90000":((index+1)%2)!=0?"#F2F2F2":null,
                                        borderRadius: 25,
                                        borderWidth:0,
                                        height: RFValue(40,735),
                                        alignItems:"center",
                                        justifyContent:"flex-start",
                                        alignSelf:"center",
                                        paddingHorizontal:normalize(10),
                                        marginVertical:2
                                    }}
                                    onPress={()=>{
                                        setDateFilters(item);
                                        
                                    }}
                                    >
                                    <Text style={{
                                        fontFamily:"OpenSansCondensedBold",
                                        fontSize:normalize(14),
                                        color:selectedFilteraPer==item?"white":"black"
                                    }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                            key={"2"}
                        />
                    </View>:null}
                    </SafeAreaView>

                    </View>
                    {selectedFilteraPer=="Personalizzato"?
                        <View style={styles.bodyright}>
                            <ProductButton
                                width={174}
                                color={"pink"}
                                productName={date[0]}
                                onPress={()=>{console.log("mango")}}
                            />
                            <View style={{height:RFValue(174,735),paddingTop:4,width:normalize(182),backgroundColor:"#D90000",borderRadius:30}}>
                                <CalendarPicker
                                    width={normalize(174)}
                                    height={RFValue(170,735)}
                                    onDateChange={onDateChange}
                                    dayShape={'square'}
                                    selectedDayColor={"white"}
                                    textStyle={{
                                        fontFamily: 'OpenSansCondensedLight',
                                        fontSize:normalize(14),
                                        color:"white",
                                      }}
                                />
                            </View>
                        </View>:null}
                    </View>
                   
                </View>
                
                <View style={styles.footer}>
                <TouchableOpacity
                    onPress={()=>{
                        // setProductLine([]);
                        setdocumentTypeFilter([]);
                        setDate([]);
                        setSelectedFilteraPer("Personalizzato")
                        // setdocumentType([]);
                        }}>
                    <Text style={styles.Registration_button}>Clear Filters</Text>
                </TouchableOpacity>
                    <ProductButton 
                        width={124}
                        productName={"CERCA"} 
                        color={"red"}
                        onPress={()=>{
                            doFilter(documentTypeFilter,date);
                            openFilter.current.snapTo(0);
                        }}
                    />
                    
                </View>
            </View>
        </SafeAreaView>
    );
}
export default RadixFilter;