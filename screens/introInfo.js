import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, TextInput, StyleSheet, Platform, Alert, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as restaurantAction from '../store/actions/restaurantEntry';
//import ImgPicker from '../components/imageSelector';

const IntroForm = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [restaurantName, setRestaurantName] = useState(editedProduct ? editedProduct.restaurantName : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [imageIsValid, setImageIsValid] = useState(false)
    const [location, setLocation] = useState('')
    const [locationIsValid, setLocationIsValid] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionIsValid, setDescriptionIsValid] = useState(false)
    //const [selectedImage, setSelectedImage] = useState()

    /* const imageTakenHandler = imagePath => {
      setSelectedImage(imagePath)
    } */

    const submitHandler = useCallback(() => {
        if (!titleIsValid || !imageIsValid || !locationIsValid || !descriptionIsValid) {
          Alert.alert('Wrong Input!', 'Please enter properly', [
            {text: 'Okay'}
          ])
          return
        }
    
        if (editedProduct) {
          dispatch(
            restaurantAction.updateProduct(prodId, restaurantName, imageUrl, location, description)
          );
        } else {
          dispatch(
            restaurantAction.createProduct(restaurantName, imageUrl, location, description)
          );
        }
        props.navigation.navigate('Feed')
      }, [dispatch, prodId, restaurantName, imageUrl, location, description]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const imageChangeHandler = text => {
        if (text.trim().length === 0){
          setImageIsValid(false)
        } else {
          setImageIsValid(true)
        }
        setImageUrl(text)
      }
    
      const titleChangeHandler = text => {
        if (text.trim().length === 0){
          setTitleIsValid(false)
        } else {
          setTitleIsValid(true)
        }
        setRestaurantName(text)
      }

      const locationChangeHandler = text => {
        if (text.trim().length === 0){
          setLocationIsValid(false)
        } else {
          setLocationIsValid(true)
        }
        setLocation(text)
      }

      const descriptionChangeHandler = text => {
        if (text.trim().length === 0){
          setDescriptionIsValid(false)
        } else {
          setDescriptionIsValid(true)
        }
        setDescription(text)
      }

    return(
        <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Restaurant Name</Text>
              <TextInput
                  style={styles.input}
                  value={restaurantName}
                  onChangeText={titleChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Image Url</Text>
              <TextInput
                  style={styles.input}
                  value={imageUrl}
                  onChangeText={imageChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Location</Text>
              <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={locationChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Description (About Restaurant)</Text>
              <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={descriptionChangeHandler}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  returnKeyType='next'
              />
            </View>
            <View>
                <Button title='next' color='black' onPress={submitHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 14
  }
});

export default IntroForm