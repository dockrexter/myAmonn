import React, { useState } from 'react';
import {View,Image,TextInput,Text,TouchableOpacity,ActivityIndicator,Dimensions,ScrollView,SafeAreaView} from 'react-native';
const { width, height } = Dimensions.get('window');
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalize } from '../../Helpers/Normalizer';
import axios from "axios";
import { RFValue } from 'react-native-responsive-fontsize';
import * as theme from "../../Theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../Components/Alert/Alert';


const Register = ({navigation}) => {
   const [open,setOpen]=useState(false);
   const userTypeData=["PRIVATO","TECHNICO PROFFESIONISTA","AGENTE AMONN","ALTRO"];
   const [userType,setUserType]=useState("SCEGLI");
   const [name, setName] = useState('');
   const [lastName, setLastName] = useState('');
   const [address, setAddress] = useState('');
   const [phonenumber, setphonenumber] = useState('');
   const [email, setEmail] = useState('');
   const [vat, setVat] = useState('0');
   const [password, setPassword] = useState('');
   const [alert,setAlert]=useState(false);
    const [alertMessage,setAlertMessage]=useState("");
    const [loading,setLoading]=useState(false);
   const register=()=>{
        var form = new FormData();
        if(name && lastName && address && phonenumber && email && password){
            form.append('username', `${email}`);
            form.append('password', `${password}`);
            form.append('first_name', `${name}`);
            form.append('email', `${email}`);
            form.append('address', `${address}`);
            form.append('profession',`${userType}`);
            form.append('vat_no', `${vat}`);
            form.append('phone_no', `${phonenumber}`);
            form.append('phone', `${phonenumber}`);
            fetch('https://amonn.texus.tech/auth/register/', {
                method: 'POST',
                body:form,
                })
                .then(r =>  r.json()
                .then(data => {
                    if(data.token){
                        console.log(data.token);
                        setLoading(false);
                        // AsyncStorage.setItem('token',JSON.stringify(data.token));
                        // AsyncStorage.setItem('userRole',JSON.stringify(""));
                        navigation.navigate("Login");
                    }
                }))
        }
        else{
            setAlert(true);
            setAlertMessage("All fields are required");
        }

   }
   const alerting=()=>{
        setAlert(false);
        setAlertMessage("");
   }
   function LoadingIndicatorView() {
    return <ActivityIndicator
              color={theme.red}
              size="large"
              style={styles.activityIndicatorStyle}
            />
}

   
if(loading){
    return LoadingIndicatorView();
}
else return (

        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center"}}>
            {alert?<Alert message={alertMessage} setAlert={alerting}/>:null}
            <View style={styles.circle}>
                <Image style={styles.avatar} source={require("../../../assets/myamonn-icons/USER.png")} />
            </View>
            <View style={styles.body}>
            <View style={{alignItems:"center"}}>
                <View style={styles.logoView}>
                    <Image  style={styles.logo} source={require("../../../assets/myamonn-icons/logo.png")} />
                </View>
                <View
                    style={open?{
                        borderTopWidth:0,
                        borderColor:"#D90000",
                        borderWidth:2,
                        width:normalize(340),
                        borderRadius:20,
                        backgroundColor:"white",
                        justifyContent:"center",
                        marginTop:RFValue(48,735),
                    }:{marginTop:RFValue(48,735)}}
                >
                <TouchableOpacity
                    onPress={()=>setOpen(prev=>!prev)}
                    style={[styles.singleBtn,open || userType != "SCEGLI"?{backgroundColor:"#D90000"}:null]}>
                    <Text style={[styles.singlebtnText,open || userType != "SCEGLI"?{color:"white"}:null]}>{userType}</Text>
                    <Icon
                        name={open?"chevron-down":"chevron-up"}
                        color={open || userType != "SCEGLI"?"white":"#D90000"}
                        size={normalize(25)}
                    />
                </TouchableOpacity>
                {open?
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={userTypeData}
                            style={{
                                width:normalize(338),
                                height:RFValue(160,735),
                                marginVertical:RFValue(10,735),
                            }}
                            contentContainerStyle={{
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                            
                            renderItem={({item ,index}) => (
                                
                                <TouchableOpacity
                                    style={{
                                        flexDirection:"row",
                                        width:normalize(328),
                                        backgroundColor:((index+1)%2)!=0?"#F2F2F2":null,
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
                                        setOpen(prev=>!prev);
                                        setUserType(item);
                                    }}
                                    >
                                    <Text style={{
                                        fontFamily:"OpenSansCondensedLight",
                                        fontSize:normalize(14),
                                        color:"black"
                                    }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                            key={"2"}
                        />
                    </View>:null}
                </View>
                {!open && userType!=="SCEGLI"?[
                <View style={styles.regForm}>
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
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            style={styles.TextInput}
                            secureTextEntry={true}
                            placeholder="PASSWORD"
                            placeholderTextColor={theme.red}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    {userType=="TECHNICO PROFFESIONISTA" || userType=="AGENTE AMONN"?(
                        <View style={styles.twoInputView}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="PARTITA IVA"
                                    placeholderTextColor={theme.red}
                                    onChangeText={(vat) => setVat(vat)}
                                />
                            </View>
                        </View>):null}
                </View>
            ]:null}
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={()=>{
                    setLoading(true);
                    register();
                }}
                >
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        
        </ScrollView>
       
  
    
  );
};

export default Register;

