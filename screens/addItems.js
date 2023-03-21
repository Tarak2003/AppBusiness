import React, { useState, useEffect, useCallback } from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert, Button, ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import * as productsActions from '../store/actions/products';
import * as restaurantActions from '../store/actions/restaurantEntry'

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const restaurant = useSelector(state => state.restaurant.userProducts)
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [imageIsValid, setImageIsValid] = useState(false);
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
  const [priceIsValid, setPriceIsValid] = useState(false);
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const submitHandler = useCallback(() => {

    if (restaurant.length === 0) {
      Alert.alert('Sorry!', 'You have to fill your Restaurant Details first', [{text: 'Okay'}])
      return
    }

    if (!titleIsValid || !imageIsValid || !priceIsValid) {
      Alert.alert('Wrong Input!', 'Please enter properly', [
        {text: 'Okay'}
      ])
      return 
    } 

    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, imageUrl, +price, description)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, imageUrl, +price, description)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, imageUrl, +price, description]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const loadRestaurant = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(restaurantActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

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
    setTitle(text)
  }

  const imageChangeHandler = text => {
    if (text.trim().length === 0){
      setImageIsValid(false)
    } else {
      setImageIsValid(true)
    }
    setImageUrl(text)
  }

  const numberChangeHandler = text => {
    if (+text >= 1) {
      setPriceIsValid(true)
    } else {
      setPriceIsValid(false)
    }
    setPrice(text)
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadRestaurant}
          color='black'
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color='black' />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Food Item</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={imageChangeHandler}
            keyboardType='default'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price.toString()}
            onChangeText={numberChangeHandler}
            keyboardType='decimal-pad'
            returnKeyType='next'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
            keyboardType='default'
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
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

export default EditProductScreen;