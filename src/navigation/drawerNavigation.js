import React, { useRef } from 'react';
import {useWindowDimensions,Platform,Image} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
import Onboarding from '../Components/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import StackNavigation from './stackNavigation';
import DrawerContent from '../Components/DrawerContent/DrawerContent';
// import { normalize } from 'react-native-responsive-fontsize';
import { normalize } from '../Helpers/Normalizer';
import { RFValue } from 'react-native-responsive-fontsize';
import Contact from '../screens/Contact/Contact';
const Drawer = createDrawerNavigator();

const DrawerNavigation=()=>{
    const dimensions = useWindowDimensions();
    return(
        <Drawer.Navigator
            drawerContent={props=><DrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                  backgroundColor: '#c6cbef',
                  width: normalize(240),
                },
                drawerType: dimensions.width >= 768 ? 'front' : 'front',
                drawerPosition:'right',
                drawerStyle:{
                  backgroundColor: '#D90000',
                  width: normalize(207),
                  height:RFValue(700,735),
                  borderBottomLeftRadius:40,
                }
              }}
              
            >
            {Platform.OS !=="web"?
            <Drawer.Screen  name="Onboarding" 
              component={Onboarding} 
              options={
                {
                  headerShown:false,
                  swipeEnabled:false,
                }}
            />:null}
            <Drawer.Screen  name="Login" 
              component={Login} 
              options={
                {
                  headerShown:false,
                  swipeEnabled:false,
                }}
            />
            <Drawer.Screen  name="Register" 
              component={Register} 
              options={
                {
                  headerShown:false,
                  swipeEnabled:false,
                }}
            />
            <Drawer.Screen  
              name="Home" 
              component={StackNavigation} 
              options={
                {
                  headerShown:false,
                  swipeEnabled:false,
                  
                }}

            />
            {/* <Drawer.Screen  
              name="Contact" 
              component={Contact} 
              options={
                {
                  // headerShown:false,
                  // swipeEnabled:false,
                  
                }}

            /> */}
      </Drawer.Navigator>
    );
}
export default DrawerNavigation;