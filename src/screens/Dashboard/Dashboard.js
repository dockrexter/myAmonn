import React,{useState,useEffect}from 'react';
import {View,Text,Image,Dimensions,TouchableOpacity} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import slides from '../../Components/Onboarding/slides';
import ProductButton from '../../Components/ProductButton/ProductButton';
import styles from './styles';
// import { normalize } from 'react-native-responsive-fontsize';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import PreProductSolButton from '../../Components/PreProductSolButton/PreProductSolButton';
import SolutionsDropdown from '../../Components/SolutionsDropdown/SolutionsDropdown';
import { getSolutions } from '../../Helpers/getSolutions';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
const width = Dimensions.get('window').width;

const Dashboard = ({route,navigation}) => {
    const [productLine,setProductLine]=useState("");
    const [solutions,setSolutions]=useState();
    const [selectedDropdownName,setSelectedDropdownName]=useState("");
    const [filter,setFilter]=useState({});
    const [query,setQuery]=useState("");
    useEffect(()=>{
        console.log(filter);
        // console.log(productLine);
    })
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontFamily:"OpenSansCondensedBold",
                        fontSize:normalize(16),
                        color:"#333333",
                        marginTop:RFValue(10,735),
                    }}
                >Bavenuto su</Text>
                <Image style={styles.logo} resizeMode="contain" source={require("../../../assets/myamonn-icons/logo-dark2x.png")} />
                <Text
                    style={{
                        fontFamily:"OpenSansCondensedBold",
                        fontSize:normalize(16,735),
                        color:"#333333"
                    }}
                    >Inizia a creare la tua bacheca personale:</Text>
                <SearchBar width={257} onChangeText={(query)=>setQuery(query)}/>
            </View>
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
                            fontSize:normalize(16,735),
                            color:"#333333",
                            alignSelf:'center'
                        }}
                    >Soluzione</Text>
                    {productLine==""?(<PreProductSolButton/>):(
                    <FlatList
                        data={solutions}
                        renderItem={({item ,index}) => (
                            <View >
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
            <TouchableOpacity
                    onPress={()=>{
                        setProductLine("");
                        setSolutions();
                        setSelectedDropdownName("");
                        setFilter({});
                        }}>
                    <Text style={styles.Registration_button}>Clear Filters</Text>
                </TouchableOpacity>
                <ProductButton 
                    width={124}
                    productName={"CERCA"} 
                    color={"red"}
                    onPress={()=>navigation.navigate("AllProducts",{filter:filter,query:query})}
                />
            </View>
            
        </ScrollView>
    );
};

export default Dashboard;
