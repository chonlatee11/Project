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