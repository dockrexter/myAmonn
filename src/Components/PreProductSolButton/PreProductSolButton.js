import React,{useEffect,useRef,useState} from "react";
import {Text,TouchableOpacity} from 'react-native';
import styles from "./styles";

const PreProductSolButton=()=>{
    
    useEffect(()=>{
    },[]);
    return(
        <TouchableOpacity style={styles.solBtn}>
            <Text style={styles.soltxt}>Seleziona una linea prodotto</Text>
        </TouchableOpacity>
    );
}
export default PreProductSolButton;