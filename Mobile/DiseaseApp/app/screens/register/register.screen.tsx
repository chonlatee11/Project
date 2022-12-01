import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button,  } from 'react-native-paper';
import { HeaderComponent } from '../../components/header.component';
import { registerStyle } from './register.style';

export const RegisterScreen = () =>{

    return(
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title='Register'/>
                <View style={registerStyle.content}>
                <TextInput label={"ชื่อผู้ใช้งาน"} />
                    <TextInput secureTextEntry label={"รหัสผ่าน"} right={<TextInput.Icon icon={'eye-off-outline'} />} />
                    <TextInput secureTextEntry label={"ยืนยันรหัสผ่าน"} right={<TextInput.Icon icon={'eye-off-outline'} />} />
                    <TextInput label={"ชื่อ"} />
                    <TextInput label={"นามสกุล"} />
                    <TextInput keyboardType='phone-pad' label={"เบอร์โทรศัพท์"} />
                    <TextInput label={"ที่อยู่"} />
                    <Button mode="contained" style={registerStyle.button}>สมัครสมาชิก</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}