import React, {useEffect, useState} from 'react';
import axios from 'axios';
const predictUrl = 'http://192.168.1.22:8000/predict';

const [resualtPredict, setResualtPredict] = useState();

export const PredicImage = async imagedata => {
    let formData = new FormData();
    formData.append('file', {
      uri: imagedata.path,
      type: imagedata.mime,
      name: imagedata.modificationDate,
    });
    await axios
      .post(predictUrl, formData, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // console.log(response.data);
        // console.log(response.json());
        // console.log(response.msg);
        setResualtPredict(response.data);
        console.log('response : ' + resualtPredict);
      })
      .catch(error => {
        console.log(error);
      });
  };