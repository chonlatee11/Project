 import React, {useState} from 'react';
 import {SafeAreaView, StyleSheet} from 'react-native';
 import Navigation from './app/navigation/navigation';
 import { AuthProvider } from './app/components/AutContext/AutContext';

 const App = () => {
   return (
    <AuthProvider>
      <SafeAreaView style={styles.root}>
        <Navigation />  
      </SafeAreaView>
    </AuthProvider>   
    ); 
 };
 
 const styles = StyleSheet.create({
   root: {
     flex: 1,
     backgroundColor: '#F9FBFC',
   },
 });
 
 export default App;