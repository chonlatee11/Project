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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DiseaseAnalyScreen = () => {
  const {height} = useWindowDimensions();
  const [image, setImage] = useState(null);
  let [resualtPredict, setResualtPredict] = useState(null);
  let [imageShow, setImageShow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let [viewResault, setViewResault] = useState(false);
  const [diseaseData, setDiseaseData] = useState(null);

  const diseaseResaultUrl = 'http://192.168.1.22:3030/diseaseresualt'
  const predictUrl = 'http://192.168.1.22:8000/predict';
  
  // const predictImage  = (imageData) => {
  //   if (imageData == null) {
  //     console.log("image is null :"+imageData);
  //     return;
  //   }else{
  //     console.log("image is not null :"+imageData);
  //     let formData = new FormData();
  //   formData.append('file', {
  //     uri: imageData.path,
  //     type: imageData.mime,
  //     name: imageData.modificationDate,
  //   });
  //   axios
  //     .post(predictUrl, formData, {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       // console.log(response.json());
  //       // console.log(response.msg);
  //       setResualtPredict(response.data);
  //       console.log("resault predict set = "+ resualtPredict)
  //       // console.log('response : ' + resualtPredict.status_code);
  //       // console.log('response : ' + resualtPredict.predicted_label);
  //       // console.log('response : ' + resualtPredict.probability);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   }
  // }; 
  const predictImage = async (image) => {
      if (image == null) {
        console.log("image is null :"+ image);
        return;
      }else{
        console.log("image is not null :" + image);
        let formData = new FormData();
      formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.modificationDate,
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
          console.log(response.data);
          let resualt = response.data;
          setResualtPrediction(resualt);
          // console.log(response.json());
          // console.log(response.msg);
          // setResualtPredict(response.data);
          // console.log("resault predict set = "+ resualtPredict)
          // console.log('response : ' + resualtPredict.status_code);
          // console.log('response : ' + resualtPredict.predicted_label);
          // console.log('response : ' + resualtPredict.probability);
          
        })
        .catch(error => {
          console.log(error);
        });
      }
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
          setImageShow(image);
          SetImage(image);
          // console.log(image)
          // setImageShow(image.path);
        })
        .catch(error => {
          if (error.code === 'E_PICKER_CANCELLED') {
            console.log('User cancelled image picker');
            return false;
          }
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
        setImageShow(image);
        SetImage(image);
        // console.log(imageShow)
        // setImage(imageData.path);
        // setImageShow(image.path);
        // setImage(imageData);
        // predictImage();
        // const resualtPredict = predictImage(imageData)
        // console.log(resualtPredict)
        // console.log("resault predict set = "+ resualtPredict)
        // setResualtPredict(predictImage(imageData))
        // console.log("resault predict set = "+ resualtPredict)
        //this.bs.current.snapTo(1);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled image picker');
          return false;
        }
      });
  };

  useEffect(() => {
    if (imageShow !== null) {
    setImage(imageShow);
    }
  }, [image]);

  const setResualtPrediction = (resualt) => {
    setResualtPredict(resualt);
  }

  const SetImage = (image) => {
    console.log("SetImage is called")
    setImage(image);
    predictImage(image);
  }

  const setDiseaseDatafetch = (diseaseData) => {
    setDiseaseData(diseaseData);
  }
  
  bs = React.createRef();

  async function InFoDisease () {
    console.log("InFoDisease is called")
    if (resualtPredict == null) {
      console.log("resualtPredict is null :"+ resualtPredict);
      return 
    }
    else {
      console.log("resualtPredict is not null :"+ resualtPredict);
      // console.log("diseaseData :" + diseaseData)
      await axios.post(diseaseResaultUrl, {
        name: resualtPredict.predicted_label,
      })
      .then(function (response) {
        // console.log(response.data.DiseaseData);
        // setDiseaseData(response.data.DiseaseData);
        setDiseaseDatafetch(response.data.DiseaseData);
        // console.log (diseaseData)
      })
    }
    
  };

  console.log("resualtPredict :"+ resualtPredict)
  console.log("diseaseData :" + diseaseData)

  const InFoDiseaseView = ({diseaseData}) => {
    console.log(diseaseData)
    if (diseaseData == null) {
      return 
    }
    return (
        <ScrollView  style={styles.ScrollView}>
          {
                    diseaseData == null ? <Text style={styles.buttonText}>ไม่มีข้อมูล</Text> :
                    <Text style={styles.text}>ชื่อโรค : {diseaseData.DiseaseName} อาการ : {diseaseData.InfoDisease}</Text>
          }
      </ScrollView>
    );
  }
  const ProtectDiseaseView = ({diseaseData}) => {
    return (
      <ScrollView  style={styles.ScrollView}>
        {
                    diseaseData == null ? <Text style={styles.buttonText}>ไม่มีข้อมูล</Text> :
                    <Text style={styles.text}>คำแนะนำการป้องกันโรค : {diseaseData.ProtectInfo}</Text>
        }
    </ScrollView>
    );
  }

  // const ViewResault = () => {
  //   return (
  //     <SafeAreaView style={styles.centeredView}>
  //         <Modal
  //           animationType="slide"
  //           transparent={true}
  //           visible={modalVisible}
  //           onRequestClose={() => {
  //             setModalVisible(!modalVisible);
  //           }}>
  //           <View style={styles.centeredView}>
  //             <View style={styles.modalView}>
  //               <SafeAreaView>

  //                 <View style={styles.containerImageModal}>
  //                 {
  //                   diseaseData == null ? <View style={styles.Image}></View> :
  //                   <Image
  //                     source={{uri: diseaseData.ImageUrl}}
  //                     // style={{height: 100, width: 100}}
  //                     style={styles.Image}
  //                 />
  //                 }
  //                 </View>
                  
  //                 <View style={styles.containerResaultText}>
  //                 {
  //                   resualtPredict == null ? <Text style={styles.buttonText}>ไม่มีข้อมูล</Text> :
  //                   <Text style={styles.buttonText}>มีโอกาสเป็นโรค {resualtPredict.probability} %</Text>
  //                 }
                    
  //                 </View>

  //                 <View style={styles.containerButtonResault}>
  //                     <Button style={styles.Resaultbutton} onPress={() => setViewResault(true)}>ข้อมูลโรค</Button>
  //                     <Button style={styles.Resaultbutton} onPress={() => setViewResault(false)}>คำแนะนำการป้องกันโรค</Button>
  //                 </View>

  //               </SafeAreaView >

  //               <SafeAreaView style={styles.ScrollContainer}>
  //               {viewResault == true ? <InFoDiseaseView diseaseData={diseaseData}/> : <ProtectDiseaseView diseaseData={diseaseData}/>}
  //               </SafeAreaView>
  //               <Pressable
  //                 style={[styles.button, styles.buttonClose]}
  //                 onPress={() => setModalVisible(!modalVisible)}>
  //                 <Text style={styles.textStyle}>Hide Modal</Text>
  //               </Pressable>
  //             </View>
  //           </View>
  //         </Modal>
  //       </SafeAreaView>
  //   );
  // }

  

  return (
    <View style={styles.container}>

      <View style={styles.containerImage}>
        {
        imageShow == null ? <View style={styles.Image}></View> :
        <Image
          source={{uri: imageShow.path}}
          // style={{height: 100, width: 100}}
          style={styles.Image}
        />
        }
      </View>
      
      <View style={styles.containerButton}>

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
            disabled={resualtPredict == null ? true : false}
            style={styles.button}
            mode={'Contained-tonal button'}
            buttonColor={'blue'}
            textColor={'white'}
            onPress={() => {setModalVisible(true); InFoDisease();}}>
            ดูผลลัพธ์
          </Button>
        </TouchableOpacity>
      </View>
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
                  {
                    diseaseData == null ? <View style={styles.Image}></View> :
                    <Image
                      source={{uri: diseaseData.ImageUrl}}
                      // style={{height: 100, width: 100}}
                      style={styles.Image}
                  />
                  }
                  </View>
                  
                  <View style={styles.containerResaultText}>
                  {
                    resualtPredict == null ? <Text style={styles.buttonText}>ไม่มีข้อมูล</Text> :
                    <Text style={styles.buttonText}>มีโอกาสเป็นโรค {resualtPredict.probability} %</Text>
                  }
                    
                  </View>

                  <View style={styles.containerButtonResault}>
                      <Button style={styles.Resaultbutton} onPress={() => setViewResault(true)}>ข้อมูลโรค</Button>
                      <Button style={styles.Resaultbutton} onPress={() => setViewResault(false)}>คำแนะนำการป้องกันโรค</Button>
                  </View>

                </SafeAreaView >

                <SafeAreaView style={styles.ScrollContainer}>
                {viewResault == true ? <InFoDiseaseView diseaseData={diseaseData}/> : <ProtectDiseaseView diseaseData={diseaseData}/>}
                </SafeAreaView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>รายงานการพบโรค</Text>
                  <MaterialCommunityIcons name="send"  size={26} />
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <MaterialCommunityIcons name="close"  size={26} />
                </Pressable>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
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
