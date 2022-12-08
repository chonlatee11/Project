import React, { useContext } from 'react';
import {View, Text, Button} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import {AuthContex} from '../../components/AutContext/AutContext';

const HomeScreen = () => {
  const {Logout, userInfo} = useContext(AuthContex);
  
  const onLogout = () => {
    // console.log(Logout);
    // console.log(userToken);
    {Logout()}
  };
    return (
      <View>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
        <Button
            onPress={onLogout}
            title="Logout"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

      </View>
    );
};

export default HomeScreen;