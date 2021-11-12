import React ,{ useEffect, useRef, useState }from 'react';
import {View,Dimensions,Text,TouchableHighlight,FlatList,ActivityIndicator,TouchableOpacity,Image,Modal,TextInput,ScrollView} from "react-native";
import styles from './styles';
import BottomButtons from '../../Components/BottomButtons/BottomButtons';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { normalize } from '../../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
import TextTicker from 'react-native-text-ticker';
import ProductButton from '../../Components/ProductButton/ProductButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from "../../Theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIM = ({route,navigation}) => {
    // const [radixDocuments,setradixDocuments]=useState(route.params.radixDocuments);
    const [query,setQuery]=useState("");
    const [langFilter,setLangFilter]=useState("IT");
    const [showReqForm,setShowReqForm]=useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const [token,setToken]=useState(null);
    const [documents,setDocuments]=useState([]);
    const [loading,setLoading]=useState(false);

    const sendRequest=()=>{
        console.log(token,"I am token");
        var form = new FormData();
        form.append('email', `${email}`);
        form.append('name', `${name}`);
        form.append('last_name', `${lastName}`);
        form.append('address', `${address}`);
        form.append('phone_no', `${phonenumber}`);
        form.append('project', `${project}`);
        fetch('https://amonn.texus.tech/bim-request/', {
                method: 'POST',
                headers: { 
                    Authorization: `Token ${token}`,
                },
                body:form,
                // body: `email=${email}&name=${name}&last_name=${lastName}&address=${address}&phone_no=${phonenumber}&project=${project}`
                })
                .then(r =>  r.json()
                .then(data => {console.log(data)}))
    }
    const getDocuments=()=>{
        fetch('https://amonn.texus.tech/bim-documents/', {
        method: 'GET',
        headers: { Authorization: `Token ${token}` }
        })
        .then(r =>  r.json()
        .then(data => {
            setDocuments(data);
        }))
       
    }
    function LoadingIndicatorView() {
        return <ActivityIndicator
                  color={theme.red}
                  size="large"
                  style={styles.activityIndicatorStyle}
                />
    }


    const getToken= ()=>{
        AsyncStorage.getItem("token").then((response)=>{
            setToken(JSON.parse(response));
            console.log(token);
            })
    }
    useEffect(()=>{
        getToken();
        getDocuments();
    },[token]);
    if(loading){
        return LoadingIndicatorView();
    }
    else return (
    
    <View style={styles.container}>
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={showReqForm}
            onRequestClose={() => {
                setShowReqForm(!showReqForm);
            }}
        >
            <ScrollView contentContainerStyle={styles.centeredView}>
            
                <View style={styles.modalView}>
                    <TouchableOpacity
                        onPress={()=>{setShowReqForm(false)}}
                        style={{alignSelf:"flex-start",top:normalize(-6),left:normalize(-6)}}
                    >
                        <Icon
                            name={"close-circle"}
                            color={"#D90000"}
                            size={normalize(30)}
                            />
                    </TouchableOpacity>
                    <View style={styles.regForm}>
                        <Text
                            style={{
                                color:"#333333",
                                fontFamily:"OpenSansCondensedBold",
                                fontSize:normalize(16),
                                marginLeft:normalize(10),
                                marginBottom:RFValue(21,735)
                            }}
                            >Fill out the form to request the document:</Text>
                        <View style={styles.twoInputView}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="NAME"
                                    placeholderTextColor={theme.red}
                                    onChangeText={(name) => setName(name)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="LAST NAME"
                                    placeholderTextColor={theme.red}
                                    onChangeText={(lastname) => setLastName(lastname)}
                                />
                            </View>
                        </View>
                        <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ADDRESS"
                                placeholderTextColor={theme.red}
                                onChangeText={(address) => setAddress(address)}
                            />
                        </View>
                        <View style={styles.twoInputView}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="PHONE NUMBER"
                                    placeholderTextColor={theme.red}
                                    onChangeText={(phonenumber) => setphonenumber(phonenumber)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="EMAIL"
                                    placeholderTextColor={theme.red}
                                    onChangeText={(email) => setEmail(email)}
                                />
                            </View>
                        </View>
                        <ScrollView style={{
                            width:normalize(338),
                            height:RFValue(97,735),
                            alignSelf:"center",
                            backgroundColor:theme.pink,
                            borderRadius: normalize(30),
                            }}>
                        <TextInput
                            style={[styles.TextInput,{height:RFValue(97,735)}]}
                            placeholder="PROJECT"
                            multiline={true}
                            placeholderTextColor={theme.red}
                            onChangeText={(project) => setProject(project)}
                        />
                        </ScrollView>
                    </View>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            sendRequest();
                            setShowReqForm(!setShowReqForm)}}
                        >
                        <Text style={styles.textStyle}>Send Request</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
        {/* .filter(doc => (doc.name).includes(langFilter)) */}
        {/* .filter(obj=>(obj.name).includes(langFilter)) */}
        <FlatList
            data={documents}
            contentContainerStyle={{
                justifyContent:"center",
                alignItems:'center',
                marginVertical:normalize(8,735)
            }}
            renderItem={({item ,index}) => {
            let q=query.toLowerCase();
            let name=String(item.name).toLowerCase();
            if(name.includes(q) && name.includes(langFilter.toLowerCase()) || q=="" && name.includes(langFilter.toLowerCase())){
                 return(
                    <TouchableHighlight>
                        <View 
                            style={{ 
                                backgroundColor: index % 2 === 0 ? 'white' : 'transparent',
                                width:normalize(334),
                                height:RFValue(48,735),
                                marginHorizontal:normalize(40),
                                paddingHorizontal:normalize(20),
                                flexDirection:"row",
                                justifyContent:"space-between"
                                }}>
                            <View 
                                style={{
                                    width:normalize(260),
                                    justifyContent:"center"
                                }}
                            >
                            <TextTicker
                                style={{
                                    color:"#333333",
                                    fontFamily:"OpenSansCondensedBold",
                                    fontSize:normalize(16),
                                    marginLeft:normalize(5),
                                }}
                                duration={9500}
                                bounce
                                >{item.name}</TextTicker>
                            </View>
                           <View style={styles.downloadBtn}>
                            <TouchableOpacity
                                onPress={()=>{setShowReqForm(true)}}
                            >
                                <Icon
                                    name={"arrow-down-circle"}
                                    color={"grey"}
                                    size={normalize(25)}
                                    />
                            </TouchableOpacity>
                           </View>
                        </View>
                    </TouchableHighlight>)}
            }}
            numColumns={1}
            key={"1"}
        />
        <BottomButtons
            Buttons={1}
            buttonText1={"My BIM"}
        />
        <View style={styles.bottomTab}>
            <SearchBar width={154} onChangeText={(query)=>setQuery(query)}/>
            <ProductButton width={100} productName={"ITA"} onPress={()=>{setLangFilter("IT")}} color={langFilter!="IT"?"pink":"red"}/>
            <ProductButton width={100} productName={"ENG"} onPress={()=>{setLangFilter("EN")}} color={langFilter!="EN"?"pink":"red"}/>
        </View>
    </View>
);};


export default BIM;

