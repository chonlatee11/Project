import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Image, TouchableOpacity } from "react-native";;
import { Button} from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';

 

const DiseaseAnalyScreen = () => {
    const { height } = useWindowDimensions();
    const [image, setImage] = useState();

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
          useFrontCamera: false
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


    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
          console.log(image.data);
          console.log(image.size);
          setImage(image.path);
        //   this.bs.current.snapTo(1);
        }).catch(error => {
          if (error.code === "E_PICKER_CANCELLED") {
            console.log("User cancelled image picker");
            return false;
          }
        });
      }
      
      bs = React.createRef();
    
    
    

    return (
        <View style={styles.container}>
            <Image
          source={
            {uri: image}
        }
          // style={{height: 100, width: 100}}
          style={styles.Image}
          resizeMode="contain"
        />
        

        <View style={styles.container}>
        <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText} onPress={takePhotoFromCamera}>ถ่ายรูปเพื่อวิเคราะห์โรคอ้อย</Text>
          </TouchableOpacity>


        <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText} onPress={choosePhotoFromLibrary}>เลือกรูปภาพจากคลังภาพ</Text>
          </TouchableOpacity>
            
        <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText} onPress={LoadModel}>วิเคราะห์โรคอ้อย</Text>
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
        maxHeight: 200,
        marginBottom: 20,
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


