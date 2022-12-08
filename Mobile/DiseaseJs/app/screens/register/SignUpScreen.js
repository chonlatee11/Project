import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const baseUrl = 'http://192.168.1.22:3030/register'

const SignUpScreen = () => {
  const {control, handleSubmit, formState: {errors}, watch} = useForm(
    {defaultValues: {username: '', password: '', repeatPassword: '', fname: '', lname: '', phoneNumber: '', address: ''}},
  );
  const [isLoding, setIsLoding] = useState(false);
  const navigation = useNavigation();
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onRegisterPress = async (data) => {
    if (isLoding) return;
    setIsLoding(true);
    const res = await axios.post(`${baseUrl}`, {
      userName: data.username,
      passWord: data.password,
      fName: data.fname,
      lName: data.lname,
      phoneNumber: data.phoneNumber,
      address: data.address,
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        Alert.alert('สมัครสมาชิกสำเร็จ', 'กรุณาเข้าสู่ระบบ');
        navigation.navigate('SignIn');
      }
    }).catch((error) => {
      Alert.alert('เกิดข้อผิดพลาด', 'กรุณาลองใหม่อีกครั้ง');
      console.log(error); 
      return;
    })
    setIsLoding(false);
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
            validate: value => value === watch('password') || 'รหัสผ่านไม่ตรงกัน',
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