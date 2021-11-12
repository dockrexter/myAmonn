import React, { useState,useEffect } from 'react';
import {StyleSheet, View,Image,TextInput,Text,ActivityIndicator,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import styles from './styles';
import axios from "axios";
import * as theme from "../../Theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../Components/Alert/Alert';

const RadixLogin = ({navigation}) => {
    const [radixId,setradixID]=useState(null);
    const [radixDocuments,setRadixDocuments]=useState([]);
    const [loading,setLoading]=useState(false);
    const [token,setToken]=useState(null);
    const [alert,setAlert]=useState(false);
    const [alertMessage,setAlertMessage]=useState("");
    function LoadingIndicatorView() {
        return <ActivityIndicator
                  color={theme.red}
                  size="large"
                  style={styles.activityIndicatorStyle}
                />
    }
    const goToRadix=()=>{
        if(radixId && radixId.length==6){
            setLoading(true);
            axios.get('https://amonn.texus.tech/Radix', {
                    params: {
                    search: radixId
                    },
                    headers: { Authorization: `Token ${token}` }
                })
                .then(function (response) {
                    setRadixDocuments(response.data);
                    setLoading(false);
                    navigation.navigate("RadixDashboard",{
                        radixDocuments:response.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
        else{
            setAlert(true);
            setAlertMessage("Please enter valid User ID");
        }
    }
    const alerting=()=>{
        setAlert(false);
        setAlertMessage("");
    
      }
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            console.log("token",token);
            if (token != null) {
              
              setToken(JSON.parse(token));
            }
          })
          .catch((err)=>{
            alert(err)
          })
         },[])
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
            <View style={styles.logoView}>
                <Image  style={styles.logo} source={require("../../../assets/myamonn-icons/logo-white.png")} />
            </View>
            <Text style={styles.radixText}>ACCESS RADIX</Text>
            
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="User ID"
                    placeholderTextColor="#D90000"
                    onChangeText={(radixId) => setradixID(radixId)}
                    />
            </View>
            
            <TouchableOpacity style={styles.RgBtn}
                onPress={()=>{
                    goToRadix()
                }}>
                <Text style={styles.RgText}>ENTER</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
                {"L'ACCESSO A RADIX È DEDICATO ESCLUSIVAMENTE AI CLIENTI \n AMONN.\n SE NON POSSIEDI UN USER ID PER ACCEDERE, CONTATTACI A \nINFO@AMONNCOLOR.COM\n PER SAPERE COME RICHIEDERNE UNO."} 
            </Text>

        </View>
        </ScrollView>
       
  
    
  );
};

export default RadixLogin;

