import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text
} from 'react-native';
import { AuthContex } from '../../components/AutContext/AutContext';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
// import Logo from '../../../assets/image/Logo.jpg';
import { useNavigation } from '@react-navigation/native'


const SignInScreen = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm(
    { defaultValues: { username: '', password: '' }  }
  );
  const { height } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(false);
  const [isloding, setIsLoding] = useState(false);
  const [user , setUser] = useState();
  const {login} = useContext(AuthContex);
  const navigation = useNavigation();

  const onSignInPressed = async (data: any) => {
    console.log(data);
    // validate user
    // if (isloding) return;
    //   try {
    //     await axios.post(`${baseUrl}`,
    //     {
    //         userName: data.username,
    //         passWord: data.password
    //     }).then((response) => {
    //       console.log(response.data);
    //       setUser(response.data);
    //       setIsLogin(true);
    //       console.log(user);
    //     })
    //   } catch (error) {
    //     Alert.alert('เกิดข้อผิดพลาด', 'กรุณาลองใหม่อีกครั้ง');
    //   }
    // setIsLoding(false);
    // props.navigation.navigate('Home');
  };

  const onSignUpPress = () => {
    // props.navigation.navigate('SignUp');
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

        <CustomButton text={ isloding ? 'กำลังเข้าสู่ระบบ' : 'เข้าสู่ระบบ' }  onPress={handleSubmit(onSignInPressed)} />

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
    marginTop: 30,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 20,
  },
});

export default SignInScreen;