import React,{useState,useEffect} from 'react';
import {Text,View, Image ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Alert from '../Alert/Alert';
const BottomTab=({productImage,productTitle,product_line})=>{
    const [addfav,setaddfav]=useState(false);
    const itemcart = {
        title:productTitle,
        image:productImage,
        product_line:product_line,
      }
    const [alert,setAlert]=useState(false);
    const [alertMessage,setAlertMessage]=useState("");
      
    useEffect(()=>{
        // if(addfav==false){
        AsyncStorage.getItem('cart').then((datacart)=>{
            if (datacart !== null) {
                const cart = JSON.parse(datacart);
                for (var index = 0; index < cart.length; index++) {
                    var product = cart[index];
                    if(product.title == itemcart.title){
                        setaddfav(true);
                        break;
                    }
                }
            }
        })
        .catch((err)=>{
            alert(err)
        })
        // }
    },[addfav]);
    const onClickAddFav=()=>{
        if(addfav==false){
            setaddfav(true);
            AsyncStorage.getItem('cart').then((datacart)=>{
                if (datacart !== null) {
                  // We have data!!
                  const cart = JSON.parse(datacart)
                  cart.push(itemcart)
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                }
                else{
                  const cart  = []
                  cart.push(itemcart)
                  AsyncStorage.setItem('cart',JSON.stringify(cart));
                }
                setAlert(true);
                setAlertMessage("Added to Favourites")
              })
              .catch((err)=>{
                alert(err)
              })
        }
      }
      const onClickRemoveFav=()=>{
            AsyncStorage.getItem('cart').then((datacart)=>{
                if (datacart !== null) {
                  // We have data!!
                  const cart = JSON.parse(datacart)
                  for (var index = 0; index < cart.length; ++index) {
                    var product = cart[index];
                    if(product.title == itemcart.title){
                        console.log(product.title,itemcart.title);
                        console.log(cart.length);
                        cart.splice(index,1);
                        setaddfav(false);
                        AsyncStorage.setItem('cart',JSON.stringify(cart));
                        console.log(cart.length);
                        break;
                    }
                   }
                }
                setAlert(true);
                setAlertMessage("Removed From Favourites")
              })
              .catch((err)=>{
                alert(err)
              })
      }
      const alerting=()=>{
        setAlert(false);
        setAlertMessage("");
    
      }
    return(
        <View style={styles.bottomTab}>
            {alert?<Alert message={alertMessage} setAlert={alerting}/>:null}
            <TouchableOpacity style={styles.photoContainer} >
                <Image  style={styles.photo} source={{uri:productImage}} />
            </TouchableOpacity>
            <View style={styles.productDetail}>
            {!addfav?(<TouchableOpacity
                    onPress={onClickAddFav}
                    >
                    <Image style={styles.fav} source={require("../../../assets/myamonn-icons/favorites.png")} />
                </TouchableOpacity>):
                (
                    <TouchableOpacity
                        onPress={onClickRemoveFav}
                        >
                        <Image style={styles.fav} source={require("../../../assets/myamonn-icons/check.png")} />
                    </TouchableOpacity>
                )}
                <Text style={styles.prdCat}>{product_line.charAt(0).toUpperCase() + product_line.slice(1)}</Text>
                <Text style={styles.prdTitle}>{productTitle}</Text>
            </View>  
        </View>
    );

};
export default BottomTab;

