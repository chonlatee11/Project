import {NavigationContainer} from '@react-navigation/native';
import {AuthContex} from '../components/AutContext/AutContext';
import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AuthStack from './AutStack';
import AppStack from './AppStack';

const AppNavigation = () => {
  const {isLoading, userToken} = useContext(AuthContex);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;

// const Stack = createNativeStackNavigator();

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
//                   <Stack.Screen name='Home' component={HomeScreen} />
//                   <Stack.Screen name='SignIn' component={SignInScreen} />
//                   <Stack.Screen name='SignUp' component={SignUpScreen} />
//               </Stack.Navigator>
//             </NavigationContainer>
//           );
// }

// const Stack = createNativeStackNavigator();

// const Navigation = () => {
//   const {isLoading, userToken} = useContext(AuthContex);

//   if (isLoading) {
//     <View style={{flex:1, justifyContent:'center',alignItems: 'center'}}>
//       <ActivityIndicator size={'large'} />
//     </View>;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         {userToken !== null ? (
//           <Stack.Screen name='Home' component={HomeScreen} />
//         ) : (
//           <>
//           <Stack.Screen name='SignIn' component={SignInScreen} />
//           <Stack.Screen name='SignUp' component={SignUpScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navigation;
