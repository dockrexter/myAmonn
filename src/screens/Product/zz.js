// if(userRole=="normal" && item.title=="SDS" || userRole=="normal" && item.title=="TDS"){
//     // console.log(docs.filter(item=>(item.name).includes(type)));
//     // console
//     return(
//     <View style={[styles.pcontainer,index==0?{marginLeft:normalize(55)}:null,index==7?{marginRight:normalize(55)}:null]}>
//         <View style={styles.docCat}>
//             <Text style={styles.docCatTitle}>{item.title}</Text>
//         </View>
//         <FlatList
//             horizontal={false}
//             showsHorizontalScrollIndicator={false}
//             data={docs}
//             renderItem={({item ,index}) => {
//                 if((item.name).includes(type)){
//                     return(
//                         <TouchableHighlight
//                             underlayColor="none"
//                             // onPress={()=>{checkPermission(item.name,type)}}
//                         >
//                             <View style={styles.doccontainer}>
//                                 <Image source={require("../../../assets/myamonn-icons/file-pdf.png")} />
//                                 <Text style={styles.docname}>{item.name}</Text>
//                             </View>
//                         </TouchableHighlight>
//                     )
//                 }
//             }}
//             numColumns={1}
//             keyExtractor={(item, index) => index.toString()}
//             // keyExtractor={item => item.name}
//             key={"1"} // if you want to use dynamic numColumns then you have to use key props
//         />
//     </View>)
// }
// else{ 