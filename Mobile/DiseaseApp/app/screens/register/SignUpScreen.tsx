import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

const SignUpScreen = (props : any) => {
  const {control, handleSubmit, formState: {errors}, watch} = useForm(
    {defaultValues: {username: '', password: '', repeatPassword: '', fname: '', lname: '', phoneNumber: '', address: ''}},
  );
  
  const onSignInPress = () => {
    props.navigation.navigate('SignIn');
  };

  const onRegisterPress = (data: any) => {
    console.log(data);
  };

  // const onTermsOfUsePressed = () => {
  //   console.warn('onTermsOfUsePressed');
  // };

  // const onPrivacyPressed = () => {
  //   console.warn('onPrivacyPressed');
  // };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>สมัครใช้งาน</Text>

        <CustomInput
          name={'username'}
          control={control}
          placeholder="ชื่อผู้ใช้งาน"
          rules={{required: 'กรุณากรอกชื่อผู้ใช้งาน'}}
        />
        
        <CustomInput
          name={'password'}
          control={control}
          placeholder="รหัสผ่าน"
          secureTextEntry
          rules={{required: 'กรุณากรอกรหัสผ่าน'}}
        />
        <CustomInput
          name={'repeatPassword'}
          control={control}
          placeholder="ยืนยันรหัสผ่าน"
          secureTextEntry
          rules={{
            validate: (data: any) => data === watch('password') || 'รหัสผ่านไม่ตรงกัน',
          }}
        />

        <CustomInput
          name={'fname'}
          control={control}
          placeholder="ชื่อ"
          rules={{required: 'กรุณากรอกชื่อ'}}
        />

        <CustomInput
          name={'lname'}
          control={control}
          placeholder="นามสกุล"
          rules={{required: 'กรุณากรอกนามสกุล'}}
        />

        <CustomInput
          name={'phoneNumber'}
          control={control}
          placeholder="เบอร์โทรศัพท์"
          rules={{required: 'กรุณากรอกเบอร์โทรศัพท์'}}
        />

        <CustomInput
          name={'address'}
          control={control}
          placeholder="ที่อยู่"
          rules={{required: 'กรุณากรอกที่อยู่'}}
        />

        <CustomButton text={"สมัครใช้งาน"} onPress={handleSubmit(onRegisterPress)} />

        {/* <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text> */}

        

        <CustomButton
          text="เข้าสู่ระบบ"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;