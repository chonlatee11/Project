import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';

const SignInScreen = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { height } = useWindowDimensions();

  const onSignInPressed = (data: any) => {
    console.log(data);
    // validate user
    props.navigation.navigate('Home');
  };

  const onSignUpPress = () => {
    props.navigation.navigate('SignUp');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          // source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="ชื่อผู้ใช้งาน"
          name={'username'}
          control={control}
          rules={{ required: 'กรุณากรอกชื่อผู้ใช้งาน' }}
        />
        <CustomInput
          placeholder="รหัสผ่าน"
          name={'password'}
          control={control}
          secureTextEntry={true}
          rules={{ required: 'กรุณากรอกรหัสผ่าน' }}
        />

        <CustomButton text="เข้าสู่ระบบ" onPress={handleSubmit(onSignInPressed)} />

        <CustomButton
          text="สมัครใช้งาน"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;