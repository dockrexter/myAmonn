import React,{useState,useEffect,useRef} from 'react';
import { Platform,KeyboardAvoidingView,FlatList,TouchableHighlight,Text,View, SafeAreaView, Image ,TouchableOpacity} from 'react-native';
import styles from './styles';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import CustomSwitch from '../../Components/CustomSwitch/CustomSwitch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { loadProducts } from '../../Helpers/getSolutions';
import { normalize } from '../../Helpers/Normalizer';
import BottomSheet from 'reanimated-bottom-sheet';
import TextTicker from 'react-native-text-ticker';
import ProductFilterContent from '../../Components/BottomSheetContent/ProductFilterContent';
import { RFValue } from 'react-native-responsive-fontsize';
const AllProducts = ({navigation,route}) => {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? normalize(80) :0
    const [filter,setFilter]=useState(route.params.filter);
    const [listView,setListView]=useState(true);
    const [query,setQuery]=useState(route.params.query);
    const [products,setProducts]=useState([]);
    const openFilter=useRef();
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
      useEffect(()=>{
        var p=loadProducts(filter);
        var newArray = p.filter(function (item) {
            return (item.name.toLowerCase()).includes(query.toLowerCase()) || query=="";
          });
        setProducts(newArray);
        // console.log(query);
      },[filter,query]);

    return(
        <View style={[styles.container,{justifyContent:"space-between"}]}>
            {listView?
            <FlatList
                // .filter(item=>(item.name.toLowerCase()).includes(query.toLowerCase()))
                data={products}
                style={styles.container}
                renderItem={({item ,index}) => {
                    return(
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={()=>productDetail(item)}>
                            <View style={styles.pcontainer}>
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
                data={products}
                style={styles.container}
                renderItem={({item ,index}) => {
                    return(
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={()=>productDetail(item)}>
                            <View 
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                    width:normalize(334),
                                    height:RFValue(60,735),
                                    justifyContent:"flex-start",
                                    alignContent:"center",
                                    marginLeft:normalize(40), 
                                }}>
                                <Text style={{color:"#333333",marginTop:normalize(10),fontFamily:"OpenSansCondensedBold",fontSize:normalize(16),marginLeft:normalize(5)}}>{(item.product_line).toUpperCase()}</Text>
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
                                        
                                    }}>{item.name}</TextTicker>
                                    </View>
                            </View>
                        </TouchableHighlight>)}
                }
                keyExtractor={(item,index)=>index.toString()}
                numColumns={1}
                key={"2"} // if you want to use dynamic numColumns then you have to use key props
            />
            }
            <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios' ?'position':'height' }keyboardVerticalOffset={keyboardVerticalOffset}>
            <BottomButtons
                Buttons={1}
                buttonText1={"Product Library"}
            />
            <View style={styles.bottomTab}>
                <View style={styles.galleryToggle}>
                <CustomSwitch
                    selectionMode={1}
                    roundCorner={true}
                    option1={'First'}
                    onSelectSwitch={onSelectSwitch}
                    option2={'Second'}
                    
                    selectionColor={'#D90000'}
                />
                </View>
                <SearchBar width={179} onChangeText={(query)=>setQuery(query)}/>
                <TouchableOpacity style={styles.filterBtn}
                    onPress={()=>{
                        openFilter.current.snapTo(1);
                    }}
                    >
                    <Text style={styles.filterText}>FILTER</Text>
                    <Icon
                        name="chevron-up"
                        color="white"
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            <BottomSheet
                ref={openFilter}
                snapPoints={[normalize(0), normalize(900)]}
                renderContent={()=><ProductFilterContent doFilter={(filter)=>{setFilter(filter)}} openFilter={openFilter}/>}
                initialSnap={0}
                enabledContentTapInteraction={false}
                // onCloseEnd={()=>{setFilter(filter)}}
            />
        </View>
    );
};

export default AllProducts