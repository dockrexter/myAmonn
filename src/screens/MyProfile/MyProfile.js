import React ,{ useEffect, useRef, useState }from 'react';
import {View,Dimensions,Text,TouchableHighlight,ActivityIndicator,TextInput,TouchableOpacity,Image, ScrollView} from "react-native";
import { normalize } from '../../Helpers/Normalizer';
import * as theme from "../../Theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../Components/Alert/Alert';

const MyProfile=({route,navigation})=>{
    const [edit,setEdit]=useState("");
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username,setusername]=useState('');
    const [userLastName,setUserLastName]=useState('');
    const [profession,setProfession]=useState('');
    const [token,setToken]=useState("");
    const [loading,setLoading]=useState(false);
    const [alert,setAlert]=useState(false);
    const [alertMessage,setAlertMessage]=useState("");
    function LoadingIndicatorView() {
        return <ActivityIndicator
                  color={theme.red}
                  size="large"
                  style={styles.activityIndicatorStyle}
                />
    }
    const getCurrentUser=()=>{
        setLoading(true);
        axios.get('https://amonn.texus.tech/current-user', {
                        
            headers: { Authorization: `Token ${token}` }
            })
            .then(function (response) {
                console.log(response.data);
                setusername(response.data.first_name);
                setUserLastName(response.data.last_name);
                setProfession(response.data.profession);
                setName(response.data.first_name);
                setphonenumber(response.data.phone_no);
                setAddress(response.data.address);
                setLastName(response.data.last_name);

            })
            .catch(function (error) {
                console.log(error,"apple");
            })
            .then(function () {
                // always executed
            });
      }
    const getToken=()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if (token != null) {
              console.log("token",token);
              setToken(JSON.parse(token));
            }
          })
          .then(()=>{
              getCurrentUser();
              setLoading(false);
            })
          .catch((err)=>{
            alert(err)
          })
    }
    const ChangePersonalInformation=()=>{
        if(name && lastName && address && phonenumber){
        var form = new FormData();
        form.append("first_name",name);
        form.append("last_name",lastName);
        form.append("address",address);
        form.append("phone_no",phonenumber);

        console.log(`Token ${token}`,"I am in change password");
        fetch('https://amonn.texus.tech/api/edit-profile/', {
                method: 'PUT',
                headers: { 
                    Authorization: `Token ${token}`,
                },
                body:form,
                })
                .then(r =>  r.json()
                .then(data => {
                    if(data.status=="success"){
                        setAlertMessage("Profile edited successfully");
                        setAlert(true);
                    }
                    else{
                        setAlertMessage("some thing went wrong");
                        setAlert(true);
    
                    }
                }))
        }
        else{
            setAlertMessage("All feilds are required");
            setAlert(true);
        }

    };
    const ChangePassword=()=>{
        var form = new FormData();
        form.append("old_password",oldPassword);
        form.append("new_password",newPassword);

        console.log(`Token ${token}`,"I am in change password");
        fetch('https://amonn.texus.tech/api/change-password/', {
                method: 'PUT',
                headers: { 
                    Authorization: `Token ${token}`,
                },
                body:form,
                })
                .then(r =>  r.json()
                .then(data => {
                    if(data.status=="success"){
                        navigation.navigate("Login",{
                            action:"logout",
                        })
                    }
                    else{
                        alert("old password is in coorect");
                    }
                }))

    }
    useEffect(()=>{
        getToken();
    },[token])
    const alerting=()=>{
        setAlert(false);
        setAlertMessage("");
    
      }
    if(loading){
        return LoadingIndicatorView();
    }
    else return(
        <ScrollView style={{flex:1}}>
        {alert?<Alert message={alertMessage} setAlert={alerting}/>:null}
        <View style={styles.container}>
            <View style={styles.body}>
                <TouchableOpacity style={{top:RFValue(30,735),left:normalize(25),elevation:50,zIndex:1000}}>
                    <Image source={require("../../../assets/myamonn-icons/edit-white.png")}/>
                </TouchableOpacity>
                <Image
                    source={require("../../../assets/myamonn-icons/USER.png")}
                    style={{height:normalize(100),width:normalize(100)}}
                />
                <View style={styles.profileDescription}>
                    <Text style={styles.username}>
                        {username}
                    </Text>
                    <Text style={styles.userType}>
                        {profession}
                    </Text>

                </View>
                {edit=="personal"?
                <View style={styles.formBody}>
                <View style={styles.regForm}>
                    <Text style={[styles.editButtonText,{marginBottom:10}]}>
                        Personal information
                    </Text>
                    <View style={styles.twoInputView}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="NAME"
                                placeholderTextColor={theme.red}
                                value={name}
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="LAST NAME"
                                placeholderTextColor={theme.red}
                                value={lastName}
                                onChangeText={(lastname) => setLastName(lastname)}
                            />
                        </View>
                    </View>
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="ADDRESS"
                            placeholderTextColor={theme.red}
                            value={address}
                            onChangeText={(address) => setAddress(address)}
                        />
                    </View>
                    <View style={styles.twoInputView}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="PHONE NUMBER"
                                placeholderTextColor={theme.red}
                                value={phonenumber}
                                onChangeText={(phonenumber) => setphonenumber(phonenumber)}
                            />
                        </View>
                    </View>
                    <View style={{justifyContent:"flex-end",alignItems:"flex-end"}}>
                        <TouchableOpacity
                            onPress={()=>{
                                ChangePersonalInformation();
                                setEdit("")}}
                            style={{
                                backgroundColor:theme.red,
                                justifyContent:"center",
                                alignItems:"center",
                                width:normalize(63),
                                height:RFValue(40,735),
                                borderRadius:25}}>
                            <Text style={{color:"white",fontFamily:"OpenSansCondensedBold",fontSize:normalize(14)}}>
                                SAVE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                :
                <TouchableOpacity 
                    style={styles.editButton}
                    onPress={()=>{
                        setEdit("personal")}
                    }
                >
                    <Text style={styles.editButtonText}>
                        Personal information
                    </Text>
                    <Image source={require("../../../assets/myamonn-icons/edit-red.png")}/>
                </TouchableOpacity>}
                {edit=="password"?
                <View style={styles.formBody}>
                <View style={styles.regForm}>
                    <Text style={[styles.editButtonText,{marginBottom:10}]}>
                        Change Password
                    </Text>
                    
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.TextInput}
                            placeholder="ACTUAL PASSWORD"
                            placeholderTextColor={theme.red}
                            onChangeText={(oldpassword) => setOldPassword(oldpassword)}
                        />
                    </View>
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.TextInput}
                            placeholder="NEW PASSWORD"
                            placeholderTextColor={theme.red}
                            onChangeText={(newpassword) => setNewPassword(newpassword)}
                        />
                    </View>
                    <View style={{justifyContent:"flex-end",alignItems:"flex-end"}}>
                        <TouchableOpacity 
                            onPress={()=>{
                                ChangePassword();
                                setEdit("")}}
                            style={{
                                backgroundColor:theme.red,
                                justifyContent:"center",
                                alignItems:"center",
                                width:normalize(63),
                                height:RFValue(40,735),
                                borderRadius:25}}>
                            <Text style={{color:"white",fontFamily:"OpenSansCondensedBold",fontSize:normalize(14)}}>
                                SAVE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>

                :<TouchableOpacity 
                    style={styles.editButton}
                    onPress={()=>setEdit("password")}
                    >
                    <Text style={styles.editButtonText}>
                        Change Password
                    </Text>
                    <Image source={require("../../../assets/myamonn-icons/edit-red.png")}/>
                </TouchableOpacity>}

            </View>
            <View>
                 <Text style={styles.contact}>
                    {"SE DESIDERI CAMBIARE LA TUA PROFESSIONE, \n CONTATTACI A INFO@AMONNCOLOR.COM"}
                </Text>
            </View>

        </View>
        </ScrollView>
    )
}

export default MyProfile;