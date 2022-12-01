import React, { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper"
import { loginStyle } from "./login.style";
import axios from "axios";

export const LoginScreen = (props: any) => {
    const baseUrl = "http://192.168.1.2:3030/login";
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const onChangeTextUsername = (username: string) => setUserName(username);
    const onChangeTextPassword = (password: string) => setPassword(password);
    const register = () => props.navigation.navigate("Register");

    const onLogin = async () => {
        if (!userName.trim() || !password.trim()) {
            setIsLogin(false);
            Alert.alert("กรุณากรอกข้อมูลให้ครบ", "ชื่อผู้ใช้งาน และ รหัสผ่าน");
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}`,
            {
                userName: userName,
                passWord: password
            })
                console.log(response.data.data);
                if (response.data.data === "Not found") {
                    setIsLogin(false);
                    Alert.alert("ไม่พบผู้ใช้งาน");
                }else{
                    Alert.alert("เข้าสู่ระบบสำเร็จ");
                    console.log(response.data.rows);
                    setUserName("");
                    setPassword("");
                    setIsLogin(true);
                }
            
        } catch (error) {
            Alert.alert("เกิดข้อผิดพลาด");
        }
    }
    
    if (isLogin){
        props.navigation.navigate("Home");
    }


    return(
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
            <Card>
                <Card.Title title="Disease App" titleStyle={loginStyle.cardTitle}></Card.Title>
                <Card.Content>
                    <TextInput label={"ชื่อผู้ใช้งาน"} onChangeText={onChangeTextUsername}></TextInput>
                    <TextInput label={"รหัสผ่าน"} secureTextEntry={true} onChangeText={onChangeTextPassword}></TextInput>
                    <Button mode="contained" style={loginStyle.cardButton} onPress={onLogin}>เข้าสู่ระบบ</Button>
                    <Button style={loginStyle.cardButton} onPress={register}>สมัครสมาชิก</Button>
                </Card.Content>
            </Card>
            </View>
        </SafeAreaView>
    );
}