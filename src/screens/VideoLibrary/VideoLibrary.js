import React,{useState,useRef} from 'react';
import 
{
    ImageBackground,
    FlatList,
    Text,
    View,
    SafeAreaView, 
    Image ,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import productslist from '../Product/productslist';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import styles from './styles';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { normalize } from '../../Helpers/Normalizer';
import { Video, AVPlaybackStatus } from 'expo-av';
import BottomSheet from 'reanimated-bottom-sheet';
import VideoFilter from '../../Components/BottomSheetContent/VideoFilter';
import { RFValue } from 'react-native-responsive-fontsize';





const VideoLibrary = () => {
    const video = useRef(null);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? normalize(80) :0;
    const [query,setQuery]=useState("");
    const [status, setStatus] = useState({});
    const [videoTypeFilter,setvideoTypeFilter]=useState([]);
    const [prodLineFilter,setProdLineFilter]=useState([]);
    const openFilter=useRef();
    
    return (
        <View style={styles.container}>
            <FlatList
                data={productslist}
                style={styles.container}
                renderItem={({item ,index}) => (
                    <TouchableOpacity>
                        <View 
                            style={{ 
                                width:normalize(314),
                                height:RFValue(235,735),
                                borderRadius:50,
                                justifyContent:"center",
                                alignItems:"center",
                                overflow:"hidden",
                                backgroundColor:"black",
                                marginHorizontal:normalize(50),
                                }}>
                            <Video
                                ref={video}
                                style={{
                                    width:normalize(314),
                                    height:RFValue(235,735),
                                    
                                    
                                }}
                                source={{
                                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                }}
                                posterSource={require("../../../assets/balti.jpeg")}
    
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                                onPlaybackStatusUpdate={status => setStatus(() => status)}/>
                            {/* <ImageBackground source={require("../../../assets/balti.jpeg")} resizeMode="cover"  style={styles.backgroundimage}>
                                <View style={styles.overlay} />
                                <Image style={styles.playButton} source={require("../../../assets/myamonn-icons/play.png")} />
                            </ImageBackground> */}
                        </View>
                        <Text style={{
                            marginTop:RFValue(15,735),
                            marginBottom:normalize(13),
                            marginHorizontal:normalize(50),
                            fontFamily:"OpenSansCondensedLight"
                            }}>Tutorial Amotherm Brick Wb</Text>
                    </TouchableOpacity>
                )}
                numColumns={1}
                key={"1"} // if you want to use dynamic numColumns then you have to use key props
            />
            <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios' ?'position':'height' }keyboardVerticalOffset={keyboardVerticalOffset}>
            <BottomButtons
                Buttons={1}
                buttonText1={"Video library"}
            />   
            <View style={styles.bottomTab}>
                <SearchBar width={264} onChangeText={(query)=>setQuery(query)}/>
                <TouchableOpacity style={styles.filterBtn}
                    onPress={()=>{openFilter.current.snapTo(1);}}>
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
                    renderContent={()=><VideoFilter doFilter={(videoType,productLine)=>{
                            setvideoTypeFilter(videoType); 
                            setProdLineFilter(productLine);
                        }} 
                        openFilter={openFilter}/>}
                        initialSnap={0}
                        enabledContentTapInteraction={false}
                />
        </View>
    );
};


export default VideoLibrary;