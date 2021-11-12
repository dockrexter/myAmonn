import React,{useState,useEffect,useRef} from 'react';
import { Platform,KeyboardAvoidingView,FlatList,TouchableHighlight,Text,View, SafeAreaView, Image ,TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import CustomSwitch from '../../Components/CustomSwitch/CustomSwitch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { loadProducts } from '../../Helpers/getSolutions';
import { normalize } from '../../Helpers/Normalizer';
import BottomSheet from 'reanimated-bottom-sheet';
import ProductFilterContent from '../../Components/BottomSheetContent/ProductFilterContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocuments } from '../../Helpers/downloadDocument';
import { openMyDocument } from '../../Helpers/downloadDocument';
import TextTicker from 'react-native-text-ticker';
import DocumentFilter from '../../Components/BottomSheetContent/DocumentFilter';
import Swipeout from 'react-native-swipeout';
import { RFValue } from 'react-native-responsive-fontsize';
import { deleteFile } from '../../Helpers/downloadDocument';
const MyProducts = ({navigation,route}) => {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? normalize(80) :0
    const [filter,setFilter]=useState(route.params.filter);
    const [prodLineFilter,setProdLineFilter]=useState([]);
    const [docTypeFilter,setDocTypeFilter]=useState([]);
    const [listView,setListView]=useState(true);
    const [query,setQuery]=useState("");
    const [products,setProducts]=useState([]);
    const [myProducts,setMyProducts]=useState([]);
    const [showDocuments,setShowDocuments]=useState(false);
    const [myDocuments,setmyDocuments]=useState();
    const [deleteDoc,setDeleteDoc]=useState();
    const [refresh,setRefresh]=useState(false);
    const openFilter=useRef();
    const [deleteItem,setDeleteItem]=useState("");
    const deletef=()=>{
        deleteFile(deleteDoc).then((response)=>{
            setRefresh(prev=>!prev);
            onSelectButton("mydocument");
        })
        
        
    }
    var swipeoutBtns = [
        {
            onPress:()=>deletef(),
            backgroundColor:"transparent",
            component:<View style={{ flex:1,justifyContent:"center",alignItems:"center"}}><Icon
                name={"delete"}
                color={"grey"}
                size={normalize(25)}
                /></View>,
        },
        {
            backgroundColor:"transparent",
            component:<View style={{ flex:1,justifyContent:"center",alignItems:"center"}}><Icon
                name={"arrow-down-circle"}
                color={"grey"}
                size={normalize(25)}
                /></View>,
        }
      ]
    const onSelectButton = async (button) => {
        if (button=="myproduct") {
            setShowDocuments(false);
        }
        else{
            setmyDocuments(await getDocuments());
            setProdLineFilter([]);
            setDocTypeFilter([]);
            setShowDocuments(true);
        }
      };
    const onSelectSwitch = index => {
        if (index==2) {
            setListView(false);
            // console.log("apple");
        }
        else{
            setListView(true);
            // console.log("mango");
        }
      };
    const productDetail=(item)=>{
        navigation.navigate("Product", {
            name: item.name,
            image: item.url,
            product_line:item.product_line,
        });
    };
    const loadMyProducts= ()=>{
        AsyncStorage.getItem('cart').then((cart)=>{
            if (cart !== null) {
              const items = JSON.parse(cart);
              console.log(items,"zzzz");
              setMyProducts(items);
            }
          })
          .catch((err)=>{
            alert(err)
          })
    }
    const onClickRemoveFav=(itemcart)=>{
        AsyncStorage.getItem('cart').then((datacart)=>{
            if (datacart !== null) {
              // We have data!!
              const cart = JSON.parse(datacart)
              for (var index = 0; index < cart.length; ++index) {
                var product = cart[index];
                if(product.title == itemcart.name){
                    console.log(product.title,itemcart.name);
                    console.log(cart.length);
                    cart.splice(index,1);
                    AsyncStorage.setItem('cart',JSON.stringify(cart));
                    console.log(cart.length);
                    setRefresh(prev=>!prev);
                    break;
                }
               }
            }
            alert("Removed From Favourites");
            
          })
          .catch((err)=>{
            alert(err)
          })
  }

      useEffect(()=>{
        loadMyProducts();
        var p=loadProducts(filter);
        var newArray = p.filter(function (item) {
            return (item.name.toLowerCase()).includes(query.toLowerCase()) || query=="";
          });
        setProducts(newArray);
       
        
      },[refresh,filter,query,route,docTypeFilter,prodLineFilter]);

    return(
        <View style={[styles.container,{justifyContent:"space-between"}]}>
            {showDocuments?
                <FlatList
                    data={myDocuments.filter(item=>docTypeFilter.some(word => item.includes(word)) && prodLineFilter.some(word => item.includes(word.toLowerCase())) || docTypeFilter.some(word => item.includes(word)) && prodLineFilter.length==0 || prodLineFilter.some(word => item.includes(word.toLowerCase())) && docTypeFilter.length==0 || docTypeFilter.length==0 && prodLineFilter.length==0 )}
                    // style={styles.container}
                    contentContainerStyle={{
                        justifyContent:"center",
                        alignItems:'center',
                        marginVertical:normalize(7,735)
                    }}
                    renderItem={({item ,index}) => (
                        <Swipeout 
                            onOpen={()=>{setDeleteDoc(item)}}	
                            backgroundColor="transparent"
                            right={swipeoutBtns}>
                            <TouchableHighlight
                            underlayColor="none"
                                onPress={()=>{
                                    openMyDocument(item);
                                }}
                            
                            >
                                <View 
                                    style={{ 
                                        backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                        width:normalize(334),
                                        height:normalize(60,735),
                                        justifyContent:"center",
                                        // alignContent:"center",
                                    }}
                                >   
                                    <View 
                                        style={{
                                            width:normalize(261),
                                        }}
                                

                                    >
                                    <TextTicker
                                        duration={3000}
                                        style={{
                                            color:"#333333",
                                            fontFamily:"OpenSansCondensedBold",
                                            fontSize:normalize(16),
                                            marginLeft:normalize(5),
                                            
                                        }}>
                                            {/* {item} */}
                                            {item.substring(0,item.indexOf("&"))}
                                    </TextTicker>
                                    </View>
                                    
                                </View>
                            </TouchableHighlight>
                        </Swipeout>
                    )}
                    keyExtractor={(item,index)=>index.toString()}
                    numColumns={1}
                    key={"3"} // if you want to use dynamic numColumns then you have to use key props
            />:[
            (listView?
            <FlatList
                data={products.filter(item => myProducts.some(({title}) => item.name === title))}
                style={styles.container}
                renderItem={({item ,index}) => {
                    return(
                        
                        <TouchableHighlight
                            underlayColor='none'
                            onLongPress={()=>{setDeleteItem(item.name);console.log(item.name)}}
                            onPress={()=>{productDetail(item);
                                            setDeleteItem("")}}>
                            <View style={styles.pcontainer}>
                            {deleteItem==item.name?<TouchableHighlight 
                                    underlayColor="none"
                                    onPress={()=>{onClickRemoveFav(item);setDeleteItem("")}}
                                    style={{position:"absolute",top:normalize(10),right:normalize(20),zIndex:1000,elevation:50,justifyContent:"flex-start",alignSelf:"flex-end"}}><Icon
                                    name={"delete"}
                                    color={"grey"}
                                    size={normalize(25)}
                                    /></TouchableHighlight>:null}
                                <Image style={styles.photo} source={{uri:item.url}} />
                                <Text style={styles.title}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                
                }}
                keyExtractor={(item,index)=>index.toString()}
                numColumns={2}
                key={"1"}
            />
            :
            <FlatList
                data={products.filter(item => myProducts.some(({title}) => item.name === title))}
                contentContainerStyle={{
                    justifyContent:"center",
                    alignItems:'center',
                    marginVertical:normalize(7,735)
                }}
                renderItem={({item ,index}) => {
                    return(
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={()=>productDetail(item)}>
                            <View 
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                    width:normalize(334),
                                    height:normalize(60,735),
                                    justifyContent:"center",
                                    alignContent:"center",
                                }}>
                                <Text style={{color:"#333333",fontFamily:"OpenSansCondensedBold",fontSize:normalize(16),marginLeft:normalize(5)}}>{(item.product_line).toUpperCase()}</Text>
                                <View 
                                    style={{
                                        width:normalize(261),
                                        // alignItems:"center",
                                        // justifyContent:"center"
                                    }}
                            

                                >
                                    <TextTicker
                                        duration={3000}
                                        style={{
                                            color:"#333333",
                                            fontFamily:"OpenSansCondensedBold",
                                            fontSize:normalize(16),
                                            marginLeft:normalize(5),
                                            
                                        }}>{item.name}
                                    </TextTicker>
                                </View>
                            </View>
                        </TouchableHighlight>)}
                }
                keyExtractor={(item,index)=>index.toString()}
                numColumns={1}
                key={"2"} // if you want to use dynamic numColumns then you have to use key props
            />
            )]}
            <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios' ?'position':'height' }keyboardVerticalOffset={keyboardVerticalOffset}>
            <BottomButtons
                Buttons={2}
                onSelectButton={onSelectButton}
                selectionMode={"myproduct"}
                buttonText1={"My Products"}
                buttonText2={"My Documents"}
            />
            <View style={styles.bottomTab}>
            {!showDocuments?
                <View style={styles.galleryToggle}>
                <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={'First'}
                    onSelectSwitch={onSelectSwitch}
                    option2={'Second'}
                    
                    selectionColor={'#D90000'}
                />
                </View>:null}
                <SearchBar width={!showDocuments?179:264} onChangeText={(query)=>setQuery(query)}/>
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
            </KeyboardAvoidingView>
            {!showDocuments?
                <BottomSheet
                    ref={openFilter}
                    snapPoints={[normalize(0), normalize(900)]}
                    renderContent={()=><ProductFilterContent doFilter={(filter)=>{setFilter(filter)}} openFilter={openFilter}/>}
                    initialSnap={0}
                    enabledContentTapInteraction={false}
                />:
                <BottomSheet
                    ref={openFilter}
                    snapPoints={[normalize(0), normalize(900)]}
                    renderContent={()=><DocumentFilter doFilter={(documentType,productLine)=>{
                            setDocTypeFilter(documentType); 
                            setProdLineFilter(productLine);
                        }} 
                        openFilter={openFilter}/>}
                        initialSnap={0}
                        enabledContentTapInteraction={false}
                />}
        </View>
    );
};

export default MyProducts;