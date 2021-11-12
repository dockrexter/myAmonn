import React from 'react';
import { Image,TouchableOpacity,View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../screens/Dashboard/Dashboard';
import AllProducts from '../screens/AllProducts/AllProducts';
import Product from '../screens/Product/Product';
import MyProducts from '../screens/MyProducts/MyProducts';
import RadixLogin from '../screens/RadixLogin/RadixLogin';
import RadixDashboard from '../screens/RadixDashboard/RadixDashboard';
import VideoLibrary from '../screens/VideoLibrary/VideoLibrary';
import BIM from '../screens/BIM/BIM';
import MyProfile from '../screens/MyProfile/MyProfile';
import Contact from '../screens/Contact/Contact';
import Notifications from '../screens/Notification/Notification';

const DashboardStack = createStackNavigator();
const StackNavigation=({navigation})=>{
    return(
        <DashboardStack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:"#D90000",
          },
          headerTintColor:"#fff",
          title:
            <View
              style={{justifyContent:"center"}}
              >
              <TouchableOpacity onPress={()=>{navigation.navigate("Dashboard")}}>
                <Image 
                  style={{alignSelf:"flex-start"}} 
                  source={require("../../assets/myamonn-icons/logo-white.png")}/>
              </TouchableOpacity>
            </View>,
            headerRight:()=>(
              <Icon.Button 
                name="ios-menu"
                size={25}
                backgroundColor="#D90000" onPress={()=>navigation.openDrawer()}>
              </Icon.Button>
            ),
            headerLeft: null,
          
        }}>
          <DashboardStack.Screen name="Dashboard" component={Dashboard} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="AllProducts" component={AllProducts} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="Product" component={Product} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="MyProducts" component={MyProducts} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="RadixLogin" component={RadixLogin} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="RadixDashboard" component={RadixDashboard} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="VideoLibrary" component={VideoLibrary} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="BIM" component={BIM} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="MyProfile" component={MyProfile} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="Contact" component={Contact} options={{gestureEnabled:false}}/>
          <DashboardStack.Screen name="Notifications" component={Notifications} options={{gestureEnabled:false}}/>




      </DashboardStack.Navigator>
      );
}
export default StackNavigation;
