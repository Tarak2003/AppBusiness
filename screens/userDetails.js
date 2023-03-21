import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as restaurantAction from '../store/actions/restaurantEntry'

const UserDetails = props => {
    const prodId = props.navigation.getParam('productId');
    const restaurant = useSelector(state => state.restaurant.userProducts)
    const editedProduct = useSelector(state =>
        state.restaurant.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [restaurantName, setRestaurantName] = useState(editedProduct ? editedProduct.restaurantName : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [imageIsValid, setImageIsValid] = useState(false)
    const [location, setLocation] = useState(editedProduct ? editedProduct.location : '')
    const [locationIsValid, setLocationIsValid] = useState(false)
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
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
        
        if (restaurant.length > 1) {
          Alert.alert('Nope!', 'You already filled details', [
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
        props.navigation.goBack()
      }, [dispatch, prodId, restaurantName, imageUrl, location, description]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const loadRestaurant = useCallback(async () => {
      try {
        await dispatch(restaurantAction.fetchProducts());
      } catch (err) {
      }
    }, [dispatch]);
  
    useEffect(() => {
      const willFocusSub = props.navigation.addListener(
        'willFocus',
        loadRestaurant
      );
  
      return () => {
        willFocusSub.remove();
      };
    }, [loadRestaurant]);
  
    useEffect(() => {
      loadRestaurant();
    }, [dispatch, loadRestaurant]);

    const titleChangeHandler = text => {
      if (text.trim().length === 0){
        setTitleIsValid(false)
      } else {
        setTitleIsValid(true)
      }
      setRestaurantName(text)
    }

    const imageChangeHandler = text => {
        if (text.trim().length === 0){
          setImageIsValid(false)
        } else {
          setImageIsValid(true)
        }
        setImageUrl(text)
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
  centered: {
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  },
  errorText: {
    color: 'red',
    fontSize: 14
  }
});

export default UserDetails