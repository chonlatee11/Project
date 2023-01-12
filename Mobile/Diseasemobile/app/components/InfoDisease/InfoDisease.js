import {useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export const  InFoDisease  = (Label,DiseaseUrl,) => {
    let diseaseData
    axios.post(DiseaseUrl, {
    name: Label,
  })
  .then(function (response) {
    // console.log(response.data);
    diseaseData = response.data
    console.log (diseaseData)
  })
    
    console.log('Label : ' + Label);
    return diseaseData;
};

export default InFoDisease;