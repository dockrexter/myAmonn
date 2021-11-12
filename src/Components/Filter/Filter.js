import React,{useState,useEffect}from 'react';
import {View,Text,Image,Dimensions} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import slides from '../Onboarding/slides';
import ProductButton from '../ProductButton/ProductButton';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import PreProductSolButton from '../PreProductSolButton/PreProductSolButton';
import SolutionsDropdown from '../SolutionsDropdown/SolutionsDropdown';
import { getSolutions } from '../../Helpers/getSolutions';

const width = Dimensions.get('window').width;

const Filter = ({route,navigation}) => {
    const [productLine,setProductLine]=useState("");
    const [solutions,setSolutions]=useState();
    const [selectedDropdownName,setSelectedDropdownName]=useState("");
    const [filter,setFilter]=useState({});
    useEffect(()=>{
        console.log(filter);
        // console.log(productLine);
    })
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.bodyleft}>
                    <Text
                        style={{
                            fontFamily:"OpenSansCondensedBold",
                            fontSize:RFValue(16,735),
                            color:"#333333",
                            alignSelf:'center'
                        }}
                    >Linea prodotto</Text>
                    <FlatList
                        data={slides}
                        renderItem={({item ,index}) => (
                            <View style={{paddingTop:RFValue(10,735)}}>
                                <ProductButton 
                                    productName={item.title.toUpperCase()} 
                                    color={Object.keys(filter).includes(item.title)?"red":"pink"}
                                    onPress={()=>{
                                        
                                        setProductLine(productLine==item.title?"":item.title);
                                        setSolutions(getSolutions(item.title.toLowerCase()));
                                        setSelectedDropdownName("");
                                        if(!Object.keys(filter).includes(item.title)){
                                            let obj={...filter};
                                            obj[item.title]=[];
                                            setFilter(obj);
                                        }
                                    }}
                                    onLongPress={()=>{
                                        if(Object.keys(filter).includes(item.title)){
                                            setProductLine("");
                                            let obj={...filter};
                                            delete obj[item.title];
                                            setFilter(obj);
                                            
                                        }
                                    }}
                                />
                            </View>
                        )}
                    
                    />
                
                </View>
                <View style={styles.bodyright}>
                    <Text
                        style={{
                            fontFamily:"OpenSansCondensedBold",
                            fontSize:RFValue(16,735),
                            color:"#333333",
                            alignSelf:'center'
                        }}
                    >Soluzione</Text>
                    {productLine==""?(<PreProductSolButton/>):(
                    <FlatList
                        data={solutions}
                        renderItem={({item ,index}) => (
                            <View>
                                <SolutionsDropdown 
                                    name={item.name} 
                                    data={item.types}
                                    onPress={()=>{
                                        setSelectedDropdownName(selectedDropdownName==item.name?"":item.name);
                                    }}
                                    selectedDropdownName={selectedDropdownName}
                                    filter={filter}
                                    getFilter={(param)=>{
                                        setFilter(param);
                                        console.log(filter);
                                    }}
                                    productLine={productLine}
                                />
                            </View>
                        )}
                    />
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <ProductButton 
                    productName={"CERCA"} 
                    color={"red"}
                    onPress={()=>navigation.navigate("AllProducts",{filter:filter})}
                />
            </View>
            
        </View>
    );
};

export default Filter;
