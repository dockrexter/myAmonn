import React,{useState,useEffect}from 'react';
import {View,Text,Image,Dimensions,SafeAreaView,TouchableOpacity} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import slides from '../Onboarding/slides';
import ProductButton from '../ProductButton/ProductButton';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import PreProductSolButton from '../PreProductSolButton/PreProductSolButton';
import SolutionsDropdown from '../SolutionsDropdown/SolutionsDropdown';
import { getSolutions } from '../../Helpers/getSolutions';
import { normalize } from '../../Helpers/Normalizer';
import documents from '../../screens/Product/documents';

const DocumentFilter=({doFilter,openFilter})=>{
    const [productLine,setProductLine]=useState([]);
    const [documentType,setdocumentType]=useState([]);

    useEffect(()=>{
        // console.log(productLine);
    })
    return(
        <SafeAreaView style={
            {
                height:normalize(900,735),
            }}>    
            <View 
                style={{
                    borderBottomWidth:2,
                    borderBottomColor:"red",
                    alignItems:"center",
                    justifyContent:"flex-end",
                    backgroundColor:'rgba(52, 52, 52, 0.8)',
                    height: normalize(300,735),
                    }}>
                <Icon
                    name="reorder-horizontal"
                    color="red"
                    size={normalize(25)}/>
            </View>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingBottom:0,
                    height: normalize(700),
                }}>
                <View style={styles.body}>
                    <View style={styles.bodyleft}>
                        <Text
                            style={{
                                fontFamily:"OpenSansCondensedBold",
                                fontSize:normalize(16,735),
                                color:"#333333",
                                alignSelf:'center'
                            }}
                        >Document Type</Text>
                        <FlatList
                            data={documents}
                            renderItem={({item ,index}) => (
                                <View style={{paddingTop:RFValue(10,735)}}>
                                    <ProductButton 
                                        width={124}
                                        productName={item.title.toUpperCase()} 
                                        color={documentType.includes(item.title)?"red":"pink"}
                                        onPress={()=>{
                                                let array=[...documentType];
                                                if(array.includes(item.title)){
                                                    const index=array.indexOf(item.title);
                                                    if (index > -1) {
                                                        array.splice(index, 1);
                                                      }
                                                }
                                                else{
                                                    array.push(item.title);
                                                }
                                                setdocumentType(array);
                                            }
                                        }
                                    />
                                </View>
                            )}
                        
                        />
                    
                    </View>
                    <View style={styles.bodyright}>
                        <Text
                            style={{
                                fontFamily:"OpenSansCondensedBold",
                                fontSize:normalize(16,735),
                                color:"#333333",
                                alignSelf:'center'
                            }}
                        >Soluzione</Text>
                        
                        <FlatList
                            data={slides}
                            renderItem={({item ,index}) => (
                                <View style={{paddingTop:normalize(10,735)}}>
                                <ProductButton 
                                    width={124}
                                    productName={item.title.toUpperCase()} 
                                    color={productLine.includes(item.title)?"red":"pink"}
                                    onPress={()=>{
                                            let array=[...productLine];
                                            if(array.includes(item.title)){
                                                const index=array.indexOf(item.title);
                                                if (index > -1) {
                                                    array.splice(index, 1);
                                                    }
                                            }
                                            else{
                                                array.push(item.title);
                                            }
                                            setProductLine(array);
                                        }
                                    }
                                />
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                <TouchableOpacity
                    onPress={()=>{
                        setProductLine([]);
                        setdocumentType([]);
                        }}>
                <Text style={styles.Registration_button}>Clear Filters</Text>
                </TouchableOpacity>
                    <ProductButton
                        width={124}
                        productName={"CERCA"} 
                        color={"red"}
                        onPress={()=>{
                            doFilter(documentType,productLine);
                            openFilter.current.snapTo(0);
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
export default DocumentFilter;