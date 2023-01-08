import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Portal, Modal, Provider } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';


const DiseaseAnalyScreen = () => {
  const {height} = useWindowDimensions();
  const [image, setImage] = useState();
  const [resualtPredict, setResualtPredict] = useState();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20 ,flex: 1, justifyContent: 'center', alignItems: 'center' , height: 500, width: 300};

  const predictUrl = 'http://192.168.1.22:8000/predict';
  const diseaUrl = 'http://192.168.1.22:3030/diseaseresualt';

  const uploadImage = async imagedata => {
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

  const checkResualt = async () => {
    console.log(resualtPredict);
    await axios
      .post(diseaUrl, {
        name: resualtPredict.predicted_label,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      width: 150,
      height: 150,
      cropping: true,
      compressImageQuality: 0.7,
      showCropGuidelines: true,
      showCropFrame: true,
      useFrontCamera: false,
      includeBase64: false,
    })
      .then(image => {
        // console.log(image);
        const imageData = image;
        setImage(imageData.path);
        uploadImage(imageData);
        //this.bs.current.snapTo(1);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled image picker');
          return false;
        }
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: false,
    })
      .then(image => {
        const imageData = image;
        setImage(image.path);
        uploadImage(imageData);
        //console.log(image.path);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled image picker');
          return false;
        }
      });
  };
  bs = React.createRef();

  return (
    
    <View style={styles.container}>
      <Image
        source={{uri: image}}
        // style={{height: 100, width: 100}}
        style={styles.Image}
      />

      <View style={styles.container}>
        <TouchableOpacity>
          <Button
            style={styles.button}
            mode={'Contained-tonal button'}
            buttonColor={'blue'}
            textColor={'white'}
            onPress={takePhotoFromCamera}>
            ถ่ายรูปเพื่อวิเคราะห์โรคอ้อย
          </Button>
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            style={styles.button}
            mode={'Contained-tonal button'}
            buttonColor={'blue'}
            textColor={'white'}
            onPress={choosePhotoFromLibrary}>
            เลือกรูปภาพจากคลังภาพ
          </Button>
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            style={styles.button}
            mode={'Contained-tonal button'}
            buttonColor={'blue'}
            textColor={'white'}
            onPress={showModal}>
            ดูผลลัพธ์
          </Button>
        </TouchableOpacity>
        </View>

        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <Text>Example Modal. Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
        </Provider>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Image: {
    width: '100%',
    height: '100%',
    maxWidth: 300,
    maxHeight: 300,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  button: {
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

export default DiseaseAnalyScreen;
