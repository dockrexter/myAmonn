import * as React from 'react';
import { Text, View, SafeAreaView ,StyleSheet,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as theme from "../../Theme";
const navbarHeight = getStatusBarHeight();
function LoadingIndicatorView() {
  return <ActivityIndicator
            color={theme.red}
            size="large"
            style={styles.activityIndicatorStyle}
          />
}
const  Contact=()=> {
  return (
    
    <WebView
          style={{marginTop:navbarHeight}}
          originWhitelist={['*']}
          source={{ uri: 'https://www.amonncolor.com/contatto/' }}  
          renderLoading={LoadingIndicatorView}
          onLoadStart={() => (LoadingIndicatorView())}
          onLoad={() => LoadingIndicatorView()}
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //Want to show the view or not
          startInLoadingState={true}
        />
  );
}
export default Contact;
const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

