import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {PredicImage} from '../DiseaseAnaly/DiseaseAnaly';

export default Camera = () => {

  const [image, setImage] = useState();
  function takePhotoFromCamera ()  {
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
        PredicImage(imageData);
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
        PredicImage(imageData);
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
};
