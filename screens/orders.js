import React, {useEffect, useState, useCallback} from "react";
import {FlatList, Button, Alert, View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {Item, HeaderButtons} from 'react-navigation-header-buttons'

import FoodMenu from '../components/menuList'
import HeaderButton from '../components/HeaderButton';
import * as productsActions from '../store/actions/products'

const MenuOverview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(productsActions.fetchProducts());
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }, [dispatch, setIsLoading, setError]);
    
      useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          loadProducts
        );
    
        return () => {
          willFocusSub.remove();
        };
      }, [loadProducts]);
    
      useEffect(() => {
        loadProducts();
      }, [dispatch, loadProducts]);

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style:'destructive', onPress: () => {dispatch(productsActions.deleteProduct(id));}}
        ])
    }

    const SelectItemHandler = id => {
      props.navigation.navigate('AddItems', { productId: id });
    }

    if (error) {
        return (
          <View style={style.centered}>
            <Text>An error occurred!</Text>
            <Button
              title="Try again"
              onPress={loadProducts}
              color='black'
            />
          </View>
        );
      }
    
      if (isLoading) {
        return (
          <View style={style.centered}>
            <ActivityIndicator size="large" color='black' />
          </View>
        );
      }
    
      if (!isLoading && products.length === 0) {
        return (
          <View style={style.centered}>
            <Text>No products found. Maybe start adding some!</Text>
          </View>
        );
      }
      
    return (
    <FlatList 
        data={products} 
        keyExtractor={item => {return item.id}}
        renderItem={(itemData) => 
        <FoodMenu 
            image={itemData.item.imageUrl} 
            title={itemData.item.title} 
            price={itemData.item.price} 
        >
            <View style={style.alert}>
                <Button title="Hide Item" onPress={() => SelectItemHandler(itemData.item.id)} />
                <Button title="DELETE" onPress={deleteHandler.bind(this, itemData.item.id)} />
            </View>
        </FoodMenu>} 
    />
    ); 
};

MenuOverview.navigationOptions = navData => {
    return {
        headerTitle: 'Restaurant Menu',
        headerRight: () => ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Edit"  
            iconName="add-outline"
            onPress={() => {
                navData.navigation.navigate('AddItems')
            }}/>
        </HeaderButtons> )
    }
    
}

const style = StyleSheet.create({
    alert: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centered: {
       flex: 1, justifyContent: 'center', alignItems: 'center' 
    }
})

export default MenuOverview;