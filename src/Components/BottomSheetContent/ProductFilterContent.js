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

const ProductFilterContent=({doFilter,openFilter})=>{
    const [productLine,setProductLine]=useState("");
    const [solutions,setSolutions]=useState();
    const [selectedDropdownName,setSelectedDropdownName]=useState("");
    const [filter,setFilter]=useState({});

    useEffect(()=>{
        console.log(filter,"apple");
        // doFilter(filter);
    },[productLine,solutions,selectedDropdownName,filter])
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
                    height: normalize(450),
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
                    height: normalize(450),
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
                        >Linea prodotto</Text>
                        <FlatList
                            data={slides}
                            renderItem={({item ,index}) => (
                                <View style={{paddingTop:RFValue(10,735)}}>
                                    <ProductButton 
                                        width={124}
                                        productName={item.title.toUpperCase()} 
                                        color={Object.keys(filter).includes(item.title)?"red":"pink"}
                                        onPress={()=>{
                                            setSelectedDropdownName("");
                                            setProductLine(productLine==item.title?"":item.title);
                                            setSolutions(getSolutions(item.title.toLowerCase()));
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
                                fontSize:normalize(16),
                                color:"#333333",
                                alignSelf:'center'
                            }}
                        >Soluzione</Text>
                        {productLine==""?(<PreProductSolButton/>):(
                        <FlatList
                            data={solutions}
                            renderItem={({item ,index}) => {
                                return(
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
                                </View>)
                            }}
                        />
                        )}
                    </View>
                </View>
                <View style={styles.footer}>
                <TouchableOpacity
                    onPress={()=>{
                        setProductLine("");
                        setSelectedDropdownName("");
                        setSolutions();
                        setFilter({});
                        }}>
                        <Text style={styles.Registration_button}>Clear Filters</Text>
                </TouchableOpacity>
                    <ProductButton 
                        width={124}
                        productName={"CERCA"} 
                        color={"red"}
                        onPress={()=>{
                            doFilter(filter);
                            openFilter.current.snapTo(0);
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
export default ProductFilterContent;