import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Alert, 
} from 'react-native';
import {Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const DiseaseAnalyScreen = () => {
  const {height} = useWindowDimensions();
  const [image, setImage] = useState();
  const [resualtPredict, setResualtPredict] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

      <View style={styles.containerImage}>
      <Image
        source={{uri: image}}
        // style={{height: 100, width: 100}}
        style={styles.Image}
      />
      </View>
      
      <View style={styles.containerButton}>
        <TouchableOpacity>
          <Button
            style={styles.button}
            mode={'Contained-tonal button'}
            buttonColor={'blue'}
            textColor={'white'}
            onPress={() => setModalVisible(true)}>
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
            onPress={() => setModalVisible(true)}>
            ดูผลลัพธ์
          </Button>
        </TouchableOpacity>

        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <SafeAreaView>

                  <View style={styles.containerImageModal}>
                  <Image
                      source={{uri: image}}
                      // style={{height: 100, width: 100}}
                      style={styles.Image}
                    />
                  </View>
                  
                  <View style={styles.containerResaultText}>
                    <Text style={styles.buttonText}>มีโอกาสเป็นโรค บลาๆๆ %</Text>
                  </View>

                  <View style={styles.containerButtonResault}>
                      <Button style={styles.Resaultbutton}>ข้อมูลโรค</Button>
                      <Button style={styles.Resaultbutton}>คำแนะนำการป้องกันโรค</Button>
                  </View>

                </SafeAreaView >

                <SafeAreaView style={styles.ScrollContainer}>
                <ScrollView style={styles.ScrollView}>
                  <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.awjofk;ajw;fjaw;jfaow;jo;fjawo;ajwo;jaw;ofj;awjofk
          ;aowjf;ojawo;jf;oawjo;fj;;oawjf;ojaw;ojf;grayaw[pkg
          a;wjog;oawjgo;awjg;aowjgfo;aw]a'pwkmfg'lakmwgokaow;'jkmgo;'k'apwkgp'awkgp'kaw
          [awpkgp[awkg[kawa'pwkgp'apwkg'pawk'pgkp'aw]]]
                  </Text>
                </ScrollView>
                </SafeAreaView>
                
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flexDirections: 'column',
    justifyContents: 'center',
    alignItems: 'center',
    direction: 'inherit',
    flexWrap: 'nowrap',
  },

  containerImage: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 400,
  },

  Image: {
    width: '100%',
    height: '100%',
    maxWidth: 300,
    maxHeight: 300,
    borderRadius: 10,
  },

  containerButton: {
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: 300,
    height: 180,
    paddingTop: 0,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

//modal
  modalView: {
    width: 350,
    height: 700,
    margin: 20,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    direction: 'inherit',
    flexWrap: 'nowrap',
    justifyContents : 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerImageModal: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 220,
    flexDirection: 'column',
  },
  containerResaultText: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 300,
    height: 45,
    paddingTop: 0,
    flexDirection: 'column',
  },
  Resaultbutton: {
    color: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerButtonResault: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 300,
    height: 45,
    paddingTop: 0,
  },
  ScrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    width: 300,
    flexDirection: 'column',
  },
  ScrollContainer:{
    flex: 1,
    paddingTop: 0,
    flexDirection: 'column',
  }

});

export default DiseaseAnalyScreen;
