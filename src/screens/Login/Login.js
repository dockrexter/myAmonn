import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
  } from "react-native";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from "../../Theme";
import axios from "axios";
import Alert from "../../Components/Alert/Alert";
// import cred from "../../../cred";
// const cheerio = require('cheerio');
// import Data from "../Data";

const Login = ({navigation,route}) => {
  const {action}=route.params ?? 'N/a';
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(null);
  const [token,setToken]=useState(null);
  const [password, setPassword] = useState('');
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
    axios.get('https://amonn.texus.tech/current-user', {
                    
                    headers: { Authorization: `Token ${token}` }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
  }
  
  const handleLogin=()=>{
    var form = new FormData();
    form.append('username', `${email}`);
    form.append('password', `${password}`);
    fetch('https://amonn.texus.tech/auth/login/', {
        method: 'POST',
        body:form,
        })
        .then(r =>  r.json()
        .then(data => {
          if(data.token){
            console.log(data.token);
            AsyncStorage.setItem('token',JSON.stringify(data.token));
            AsyncStorage.setItem('userRole',JSON.stringify(""));
            setRole("");
            setToken(data.token);
            setLoading(false);
            navigation.navigate("Home");
          }
          else{
            // alert("please enter valid credentials");
            setAlert(true);
            setAlertMessage("please enter valid credentials");
            setLoading(false);
          }
        }))
  }
  const handleLogout=()=>{
    setLoading(true);
    fetch('https://amonn.texus.tech/auth/logout/', {
        method: 'GET',
        headers: { 
          Authorization: `Token ${token}`,
        },
        })
        .then(() => {
          AsyncStorage.removeItem('userRole');
          AsyncStorage.removeItem('token');
          setRole(null);
          setToken(null);
          setEmail('');
          setPassword('');
          setLoading(false);
        })
  };
  useEffect(()=>{
    console.log(action,token);
    if(action=="logout"){
      handleLogout();
    }
    else{
      AsyncStorage.getItem('userRole').then((role)=>{
        if (role != null) {
          console.log("role",role);
          setRole(role);
        }
      })
      .catch((err)=>{
        alert(err)
      })
      AsyncStorage.getItem('token').then((token)=>{
        if (token != null) {
          console.log("token",token);
          setToken(token);
        }
      })
      .catch((err)=>{
        alert(err)
      })
     
    }
  },[route]);
  useEffect(()=>{
    console.log("token",token,"role",role);
    if(role && token){
      navigation.navigate("Home");
    }
  },[role,token])
  const alerting=()=>{
    setAlert(false);
    setAlertMessage("");

  }
  if(loading){
    return LoadingIndicatorView();
}
else return (
        <ScrollView style={{flex:1}}>
            {alert?<Alert message={alertMessage} setAlert={alerting}/>:null}
            <View style={styles.container}>
            <Image style={styles.avatar} source={require("../../../assets/myamonn-icons/USER.png")} />
            {/* {role!=null && token!=null?
            <View style={styles.profileDescription}>
                <Text style={styles.username}>
                    DANISH MOHY
                </Text>
                <Text style={styles.userType}>
                    TECNICO PROFESSIONISTA
                </Text>
            </View>: */}
            <Image style={styles.logo} source={require("../../../assets/myamonn-icons/logo-dark.png")} />
            {role==null && token==null?
            <View style={[styles.inputView,email?{backgroundColor:"grey"}:null]}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Username"
                  placeholderTextColor="#FFFFFF"
                  onChangeText={(email) => setEmail(email)}
                />
            </View>:null}
            {role==null && token==null?
            <View style={[styles.inputView,password?{backgroundColor:"grey"}:null]}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor="#FFFFFF"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
            </View>:null}
            <TouchableOpacity style={styles.loginBtn}
                onPress={()=>{
                  if(role==null && token==null){
                    setLoading(true);
                    handleLogin();
                  }
                  else{
                    navigation.navigate("Home");
                  }
                    
                }}
            >
                <Text style={styles.loginText}>INVIA</Text>
            </TouchableOpacity>
            {role==null && token==null?
            <TouchableOpacity
              onPress={()=>{
                navigation.navigate("Register");
                }}>
                <Text style={styles.Registration_button}>Registrati</Text>
            </TouchableOpacity>:null}

            </View>
        </ScrollView> 
  );
};

export default Login;
