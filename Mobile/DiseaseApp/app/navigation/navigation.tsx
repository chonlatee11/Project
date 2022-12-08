import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/register/SignUpScreen';
import HomeScreen from '../screens/home/home';
import { AuthContex } from '../components/AutContext/AutContext';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from "react-native";

export type RootStackParamList = {
  Home: undefined
  SignIn: undefined;
  SignUp: undefined;
};

// const Stack = createNativeStackNavigator<RootStackParamList>();


// const Navigation = () => {

//   const {isLoading, userToken} = useContext(AuthContex);

//   if (isLoading) { 
//         <View style={{flex:1, justifyContent:'center',alignItems: 'center'}}>
//           <ActivityIndicator size={'large'} />
//         </View>;
//       }
//       return (
//             <NavigationContainer>
//               <Stack.Navigator screenOptions={{headerShown: false}}>
//                 {userToken ? (
//                   <Stack.Group>
//                     <>
//                     <Stack.Screen name='Home' component={HomeScreen} />
//                     </>
//                   </Stack.Group>  
//                 ) : (
//                   <Stack.Group>
//                     <>
//                       <Stack.Screen name='SignIn' component={SignInScreen} />
//                       <Stack.Screen name='SignUp' component={SignUpScreen} />
//                     </>
//                   </Stack.Group>
//                 )}
//               </Stack.Navigator>
//             </NavigationContainer>
//           );
// }

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='SignIn' component={SignInScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
              
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;