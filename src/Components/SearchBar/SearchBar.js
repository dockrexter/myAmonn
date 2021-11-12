import React, { useRef, useState } from "react";
import {View,TouchableOpacity,TextInput,Image} from "react-native";
import styles from "./styles";
import * as theme from "../../Theme";
// import { normalize } from "react-native-responsive-fontsize";
import { normalize } from "../../Helpers/Normalizer";

const SearchBar=({width,onChangeText})=>{
    const [query,setQuery]=useState();
    const input=useRef();
    return(
        <View style={styles(width).searchBtn}>
            <TextInput
                ref={input}
                placeholder="SEARCH"
                placeholderTextColor={theme.red}
                onChangeText={(query) => {
                    setQuery(query);
                    onChangeText(query);
                }}
                style={styles(width).searchText}
            />
            <TouchableOpacity style={{position:"absolute",right:10}}
                onPress={()=>input.current.focus()}
                >
                <Image style={{width:normalize(18),height:normalize(18)}}source={require("../../../assets/myamonn-icons/search.png")} />
            </TouchableOpacity>
        </View>
    );
}

export default SearchBar;