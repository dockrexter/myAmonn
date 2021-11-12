
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
// import FileViewer from 'react-native-file-viewer';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';


export const downloadFile=async (name,type,product_line)=> {
    const myDocuments= await getDocuments();
    let final=name+"&"+product_line;
    if(!myDocuments.includes(final)){
    // Downloading the file
        const url="https://amonn.texus.tech/download/";
        axios.get(url
            , {
                params: {
                    name: name,
                    type: type.toLowerCase()
                },
            }
            )
        .then(async function(response) {
            // handle success
            console.log(response.data);
            await createFile("https://amonn.texus.tech/"+response.data,name,product_line).then(()=>{
                return true;
            })
            
            // getDocuments();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
    else{
        const finalName=name+"&"+product_line;
        const fileUri = `${FileSystem.documentDirectory}${finalName}`;
        console.log(fileUri);
        openFile(fileUri);
        return true;
    }

}

const createFile= async (url,name,product_line)=>{
    const finalName=name+"&"+product_line;
    const fileUri = `${FileSystem.documentDirectory}${finalName}`;
    const downloadedFile= await FileSystem.downloadAsync(url, fileUri);
    console.log(downloadedFile,"mango");
    openFile(downloadedFile.uri)
};

export const getDocuments=async ()=>{
    const directory = FileSystem.documentDirectory;
    const files= await FileSystem.readDirectoryAsync(directory);
    return [...files];
}

const openFile=(uri)=>{
    FileSystem.getContentUriAsync(uri).then(cUri => {
        if(Platform.OS=="android"){
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: cUri,
                flags: 1,
                type: 'application/pdf'
            });
        }
        else{
            Linking.openURL(cUri);
        }
    })
    .catch((error)=>{
        alert(error);
    })
}

export const openMyDocument=(name)=>{
    const uri = `${FileSystem.documentDirectory}${name}`;
    FileSystem.getContentUriAsync(uri).then(cUri => {
        if(Platform.OS=="android"){
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: cUri,
                flags: 1,
                type: 'application/pdf'
            });
        }
        else{
            Linking.openURL(cUri);
        }
    })
    .catch((error)=>{
        alert(error);
    })
}

export const deleteFile=async (name)=>{
    const uri = `${FileSystem.documentDirectory}${name}`;
    await FileSystem.deleteAsync(uri)
    .catch((error)=>{console.log(error)})

      

}


