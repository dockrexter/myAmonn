import React, { useEffect, useState } from "react";
import { View,StyleSheet,TouchableOpacity,Image,SafeAreaView,Platform,StatusBar} from "react-native";
import { TouchableOpacity as Touch} from 'react-native-gesture-handler'
// import { normalize } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";
import {Drawer,Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";


export default DrawerContent = (props)=> {
  const [langopen,setlangopen]=useState(false);
  const [language,setLanguage]=useState("IT");
  const array=[{"name":"IT"},{"name":"DE"},{"name":"EN"},{"name":"ES"}]
  const [languages,setLanguages]=useState(array);
  useEffect(()=>{
    
   
  },[language]);
  useEffect(()=>{
   
  },[langopen]);
    return(
        <SafeAreaView style={{flex:1}}>
              <View style={styles.drawerContent}>
              <View style={styles.row}>
                <View style={styles.bodyleft}>
                {langopen?
                    <FlatList
                      data={languages}
                      style={{
                        backgroundColor:"white",
                        width:normalize(70),
                        height:RFValue(120,735),
                        borderRadius:15,
                        position:"absolute",
                        top:RFValue(30,735)
                        
                      }}
                      keyExtractor={item => item.name}
                      renderItem={({item,index})=>(
                        <Touch
                          onPress={()=>{
                            setLanguage(item.name);
                            AsyncStorage.setItem('language',JSON.stringify(language));
                            setlangopen(prev=>!prev);
                            props.navigation.navigate("Dashboard");
                          }}
                          style={{
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:index%2==0?"#E4E4E4":"white",
                            borderBottomRightRadius:index==(languages.length-1)?15:0,
                            borderBottomLeftRadius:index==(languages.length-1)?15:0,
                            width:normalize(70),
                            height:RFValue(30,735),
                          }}
                        >
                          <Text style={
                            {fontFamily:"OpenSansCondensedBold",
                            fontSize:normalize(14,735),
                            color:"black",
                          }}>{item.name}</Text>
                        </Touch>
                      )}
                          key={"9"}
                    />
                  :null}
                  <TouchableOpacity style={[styles.langBtn,langopen?{backgroundColor:"#D90000"}:null]}
                    onPress={()=>{setlangopen(prev=>!prev)}}
                    >
                    <Text style={
                      {fontFamily:"OpenSansCondensedBold",
                      fontSize:normalize(14,735),
                      color:langopen?"white":"#D90000",
                    }}>{language}</Text>
                    <Icon
                      name={langopen?"chevron-up":"chevron-down"}
                      color={langopen?"white":"#D90000"}
                      size={normalize(25)}
                    />
                  </TouchableOpacity>
                  
                </View>
                <View style={styles.bodyright}>
                  <TouchableOpacity style={styles.logoutBtn} 
                    onPress={()=>{
                      props.navigation.navigate("Login",{
                        action:"logout",
                      });
                    }}
                    >
                    <Image style={styles.logouticons} source={require("../../../assets/myamonn-icons/logout.png")} />
                    <Text style={styles.logoutText}>LOGOUT</Text>
                  </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.userInfoSection}>
                  <TouchableOpacity
                    onPress={()=>props.navigation.navigate("MyProfile")}
                  >
                    <Image
                      source={require("../../../assets/myamonn-icons/USER.png")}
                      style={{height:normalize(100),width:normalize(100)}}
                    />

                  </TouchableOpacity>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                  <TouchableOpacity style={styles.searchBtn}
                    onPress={()=>{props.navigation.navigate("Dashboard")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/searchWhite.png")} />
                    <Text style={styles.searchText}>RICERCA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("MyProducts",{filter:[]})}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/user2.png")} />
                    <Text style={styles.loginText}>I MIEI PREFERITI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("AllProducts",{filter:[],query:""})}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/paintBucket.png")} />
                    <Text style={styles.loginText}>PRODOTTI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("VideoLibrary")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/video-library.png")} />
                    <Text style={styles.loginText}>LIBRERIA VIDEO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("BIM")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/document-library.png")} />
                    <Text style={styles.loginText}>BIM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("login")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/calculator.png")} />
                    <Text style={styles.loginText}>PROGRAMMI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("Notifications")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/notifications.png")} />
                    <Text style={styles.loginText}>AVVISI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("RadixLogin")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/external-link.png")} />
                    <Text style={styles.loginText}>ACCESSO A RADIX</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerBtn}
                    onPress={()=>{props.navigation.navigate("Contact")}}
                    >
                    <Image style={styles.icons} source={require("../../../assets/myamonn-icons/external-link.png")} />
                    <Text style={styles.loginText}>CONTATTACI</Text>
                  </TouchableOpacity>
                </Drawer.Section>
              </View>
            {/* </DrawerContentScrollView> */}
        </SafeAreaView>
    );
};

const styles =StyleSheet.create({
    drawerContent:{
      flex:1,
      marginTop:Platform.OS=="android"?StatusBar.currentHeight:0,
    },
    userInfoSection:{
      alignItems:'center'
    },
    title:{
      fontSize:normalize(16,735),
      marginTop:RFValue(3,735),
      fontWeight:'bold',
    },
    caption:{
      fontSize:normalize(14,735),
      lineHeight:normalize(14,735),
    },
    row:{
      marginTop:RFValue(10,735),
      marginBottom:RFValue(10,735),
      flexDirection:'row',
      alignItems:'center',
      zIndex:1000,
      elevation: (Platform.OS === 'android') ? 50 : 0
    },
    section:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      marginRight:normalize(15),
    },
    paragraph:{
      fontWeight:'bold',
      marginRight:normalize(3),
    },
    drawerSection:{
      marginTop:RFValue(10,735),
      alignItems:'center',
    },
    bottomDrawerSection:{
      marginBottom:RFValue(15,735),
      borderTopColor:"#f4f4f4",
      borderTopWidth:1
    },
    preference:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:RFValue(12,735),
      paddingHorizontal:normalize(16),

    },
    drawerBtn: {
      width: normalize(165),
      flexDirection:"row",
      borderBottomLeftRadius:15,
      borderBottomRightRadius:15,
      borderTopRightRadius:15,
      marginTop:RFValue(10,735),
      height: RFValue(40,735),
      alignItems: "flex-start",
      backgroundColor: "white",
    },
    loginText:{
        color:"#D90000",
        alignSelf:"center",
        marginLeft:normalize(13.33),
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14)
    },
    
    searchBtn: {
      width:normalize(165),
      flexDirection:"row",
      borderRadius:15,
      borderWidth:2,
      borderColor:"#FFFFFF",
      marginTop:RFValue(10,735),
      height: RFValue(40,735),
      alignItems: "flex-start",
      // justifyContent:"center",
      backgroundColor: "transparent",
    },
    searchText:{
        color:"#FFFFFF",
        // fontWeight:'bold',
        alignSelf:"center",
        marginLeft:normalize(13.33),
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(14)
    },
    icons:{
      alignSelf:"center",
      marginLeft:normalize(13.33),
      marginVertical:RFValue(10,735),
      width:normalize(20),
      height:normalize(20),
      resizeMode:"contain"
    },
    logoutBtn: {
      width:normalize(70),
      height:RFValue(30,735),
      flexDirection:"row",
      borderRadius:10,
      paddingHorizontal:RFValue(5),
      alignItems: "center",
      justifyContent:"space-between",
      borderWidth:2,
      borderColor:"#FFFFFF",
      backgroundColor: "transparent",
    },
    logoutText:{
      fontFamily:"OpenSansCondensedBold",
      color:"#FFFFFF",
      fontSize:normalize(11,735)
  },
  logouticons:{
    marginVertical:RFValue(8,735)
  },
    langBtn: {
      width:normalize(70,735),
      height:RFValue(30,735),
      flexDirection:"row",
      borderRadius:10,
      // marginTop:10,
      paddingHorizontal:normalize(5),
      alignItems: "center",
      justifyContent:"space-between",
      backgroundColor: "white",
    },
    bodyleft:{ 
      flex: 2,
      flexDirection:"column",
      alignItems:"center"
    },
    bodyright:{ 
      flex: 2,
      flexDirection:"column",
      alignItems:"center"
    },
  });