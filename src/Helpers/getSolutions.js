import Data from "../Data";
export const getSolutions=(productName)=>{
    for(var i in Data){
        if(i==productName){
            return (Data[i].solutions);
        }
    }
};
Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
  
export const loadProducts=(filter,query)=>{
    var alldata=[]
    for(var i in Data){
        let productline=i.charAt(0).toUpperCase()+i.slice(1);
        if(productline in filter){
            for(var j in Data[i].solutions){
                if(filter[productline].includes((Object.values(Data[i].solutions[j]))[0]) && i=="bessemer" || filter[productline].length==0 && i=="bessemer"){
                    alldata=alldata.concat([...(Object.values(Data[i].solutions[j]))[2]]);
                }
                for(var k in Data[i].solutions[j].types){
                    if(filter[productline].includes((Object.values(Data[i].solutions[j].types[k]))[0]) && i!="bessemer" || filter[productline].length==0 && i!="bessemer"){
                        alldata=alldata.concat((Object.values(Data[i].solutions[j].types[k]))[2])
                    }
                }
                
            }
        }
        else if(Object.size(filter)==0){
            for(var j in Data[i].solutions){
                if(i=="bessemer"){
                    alldata=alldata.concat([...(Object.values(Data[i].solutions[j]))[2]]);
                }
                for(var k in Data[i].solutions[j].types){
                    if(i!="bessemer"){
                        alldata=alldata.concat((Object.values(Data[i].solutions[j].types[k]))[2])
                    }
                } 
            }
        }
    }
    return alldata;
}

// AsyncStorage.getItem('data').then((datacart)=>{
    //     if (datacart !== null) {
    //         // We have data!!
    //         console.log(datacart);
    //         const data = JSON.parse(datacart)
    //         for(var i in data){
    //             if(i==productName){
    //                 setSolutions(data[i].solutions);
    //             }
    //         }  
    //     }
    // })
    // .catch((err)=>{
    //     alert(err)
    // })