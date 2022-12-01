import React, { PureComponent, useEffect, useState } from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import { View, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { HomeScreenStyle } from "./home.style";
import axios from "axios";

// const baseUrl = 'https://reqres.in';

// axios.get(`${baseUrl}/api/user/1`).then((response) => {
//     console.log(response.data);
// })

// const fetDisease =async () => {
//     const url = `${baseUrl}/api/user/1`;
//     const response = await axios.get(url);
//     console.log(response.data);
// }

const axiosInstance = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' }) // instance url for request 

// axios.get('api/user/1').then((response) => { // call api from instance
//     console.log(response.data);
// })


export default class HomeScreen extends PureComponent{
    constructor(props: any) {
        super(props);
        this.state = {
            item: []
        }
    }

    componentDidMount() {
        this.getData()
    }
        


    getData = async () => {
        const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
        const response = await fetch(endpoint);
        const data = await response.json();
        this.setState({ items: data }); 
    }

    _renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity style={HomeScreenStyle.card}>
                <Image style={HomeScreenStyle.cardImage} source={{uri: item.url}} />
                <Text style={HomeScreenStyle.cardTextTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    render(){
        let { items } = this.state;
        return(
            <FlatList
            style={HomeScreenStyle.container}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
         />
        );
    }
}
