import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from "react-native";;
import { Button} from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const DiseaseAnalyScreen = () => {
    const { height } = useWindowDimensions();
    const [image, setImage] = useState();
    const [onloadImage, setOnloadImage] = useState(false);
    const baseUrl = 'http://192.168.1.22:8000/upload'

    

    const takePhotoFromCamera = () => {
          ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          width: 150,
          height: 150,
          cropping: true,
          compressImageQuality: 0.7,
          showCropGuidelines: true,
          showCropFrame : true,
          useFrontCamera: false,
          includeBase64: true
        }).then(image => {
          console.log(image);
          setImage(image.path);
        //   this.bs.current.snapTo(1);
        }).catch(error => {
          if (error.code === "E_PICKER_CANCELLED") {
            console.log("User cancelled image picker");
            return false;
          }
        });
      }
  
    // const uploadImage = async (formData) => {
    //     const baseUrl = 'http://192.168.1.22:8000/upload'
    //     let response = await fetch(baseUrl,{
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },  
    //     }
    //     )
    //         .then(response => {
    //             console.log(response.status);
    //             console.log(response.JSON);
    //             // console.log(response.msg);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };
    const uploadImage = async (imagedata) => {
      let formData = new FormData();
            formData.append('file', {
              uri: imagedata.path,
              type: imagedata.mime,
              name: imagedata.modificationDate
            })
            await axios.post(baseUrl, formData,{
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }
            ).then((response) => {
              console.log(response.data);
              // console.log(response.json());
              // console.log(response.msg);
            }
            ).catch(error => {
              console.log(error);
          });
        };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
          includeBase64: false
        }).then(image => {
          const imageData = image
          uploadImage(imageData)
          // console.log(image.path);
          setImage(image.path); 
        })
        .catch(error => {
          if (error.code === "E_PICKER_CANCELLED") {
            console.log("User cancelled image picker");
            return false;
          }
        });
      }
      
      bs = React.createRef();

      useEffect(() => {
        
    }, []);
    
    return (
        <View style={styles.container}>
            <Image
          source={
            {uri: image}
        }
          // style={{height: 100, width: 100}}
          style={styles.Image}
          // resizeMode="contain"
        />
        

        <View style={styles.container}>
        <TouchableOpacity style={styles.button} >
              <Button  onPress={takePhotoFromCamera}>ถ่ายรูปเพื่อวิเคราะห์โรคอ้อย</Button>
          </TouchableOpacity>


        <TouchableOpacity style={styles.button} >
              <Button  onPress={choosePhotoFromLibrary}>เลือกรูปภาพจากคลังภาพ</Button>
          </TouchableOpacity>
            
        <TouchableOpacity style={styles.button} >
              <Button  >วิเคราะห์โรคอ้อย</Button>
          </TouchableOpacity>
        
          </View>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    Image: {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        maxHeight: 300,
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 10
      },
      button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 10    
      },
      buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
      }
});


export default DiseaseAnalyScreen;


