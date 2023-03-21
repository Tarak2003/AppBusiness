import React, {useState, useEffect, useCallback} from "react"
import {View, SafeAreaView, Alert, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import * as authActions from '../store/actions/auth'
import * as restaurantActions from '../store/actions/restaurantEntry'
import RestaurantTitle from "../components/restaurantTitle";

const UserScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const restaurant = useSelector(state => state.restaurant.userProducts)
    const dispatch = useDispatch();

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

    const logoutHandler = () => {
        Alert.alert('Are you sure?', 'Do you really want to log out?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style:'destructive', onPress: () => {{
                    dispatch(authActions.logout());
                    props.navigation.navigate('Auth')
                }}}
        ])
    }

    const showOrderHistory = () => {
      props.navigation.navigate('OrderScreen')
    }

    const editProductHandler = id => {
        props.navigation.navigate('UserDetails', { productId: id });
    };

    if (!isLoading && restaurant.length === 0) {
      return(
        <View style={styles.centered}>
          <Text style={styles.errorText}>Please fill your details first to enjoy your journey with us!</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('UserDetails')}>
            <Text style={styles.formButton}>Click Here</Text>
            <View style={styles.components}>
                    <TouchableOpacity onPress={logoutHandler}>
                         <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    return (
        <View style={styles.userArea}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.component}>
                    <FlatList 
                    data={restaurant} 
                    keyExtractor={item => item.id}
                    renderItem={itemData =>  
                      <RestaurantTitle restaurantTitle={itemData.item.restaurantName}/> }
                    /> 
                </View>
                <View style={styles.components}>
                    <View style={styles.columns}>
                      <FlatList 
                      data={restaurant} 
                      keyExtractor={item => item.id}
                      renderItem={itemData =>  
                        <TouchableOpacity style={styles.columns} onPress={() => editProductHandler(itemData.item.id)}> 
                          <Text style={styles.setting}>Profile</Text>
                          <MaterialIcons name="keyboard-arrow-right" size={27} color="black" />
                        </TouchableOpacity> }
                      /> 
                    </View>
                </View>
                <View style={styles.components}>
                  <View style={styles.columns}>
                    <TouchableOpacity style={styles.columns}>
                    <FlatList 
                      data={restaurant} 
                      keyExtractor={item => item.id}
                      renderItem={itemData =>  
                        <TouchableOpacity style={styles.columns} onPress={() => showOrderHistory()}> 
                          <Text style={styles.setting}>Orders</Text>
                          <MaterialIcons name="keyboard-arrow-right" size={27} color="black" />
                        </TouchableOpacity> }
                      /> 
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lineStyle} />
                <View style={styles.components}>
                    <TouchableOpacity onPress={logoutHandler}>
                         <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

UserScreen.navigationOptions = navData => {
  return {
      headerTransparent: true,
      headerTitle: ''
  }
  
}

const styles = StyleSheet.create({
    lineStyle:{
        borderWidth: 0.4,
        borderColor:'grey',
        margin: 2,
        marginHorizontal: 15
   },
   userArea: {
        flex: 1, 
        padding: 20, 
        marginVertical: 10
   },
   components: {
       padding: 10
   },
   logout: {
       color: 'rgba(128,0,0,0.9)',
       textAlign: 'center',
       fontWeight: '700',
       fontSize: 18
   },
   abc: {
       fontWeight: '600',
       fontSize: 18,
   },
   columns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
   },
   centered: {
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  },
  setting: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  component: {
    padding: 10
  },
  errorText:{
    fontSize: 21,
    paddingVertical: 25,
    paddingHorizontal: 30,
    textAlign: 'center',
    lineHeight: 27
  },
  formButton: {
    fontSize: 18,
    color: 'purple',
    fontWeight: '700',
    borderBottomWidth: 0.5,
    borderBottomColor: 'purple'
  }
})

export default UserScreen