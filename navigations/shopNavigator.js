import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'

import MenuOverview from '../screens/orders'
import RestaurantHome from '../screens/restaurantHome'
import OrderScreen from '../screens/orderHistory';
import EditProductScreen from '../screens/addItems';
import AuthScreen from '../screens/AuthScreen';
import StartUpScreen from '../screens/startupScreen';
import UserScreen from '../screens/userScreen';
import IntroForm from '../screens/introInfo';
import UserDetails from '../screens/userDetails';

const ProductsNavigator = createStackNavigator({
    MenuOverview: {
        screen: MenuOverview
    },
    AddItems: {
        screen: EditProductScreen
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'white'
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center'
    }
});

const UserSettings = createStackNavigator({
    UserScreen: {
        screen: UserScreen
    },
    UserDetails: {
        screen: UserDetails
    },
    OrderScreen: {
        screen: OrderScreen
    }
})

const MealsNavigator = createBottomTabNavigator({
    Home: {
        screen: RestaurantHome,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name = "home"
                size = { 18 }
                color = { tabInfo.tintColor }
                / >
            }
        }
    },
    Menu: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <MaterialIcons name = "menu-book"
                size = { 18 }
                color = { tabInfo.tintColor }
                / >
            }
        }
    },
    Settings: {
        screen: UserSettings,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <FontAwesome name = "user-circle-o"
                size = { 18 }
                color = { tabInfo.tintColor }
                / >
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'black',
    }
});

const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen
    },
    Details: {
        screen: IntroForm
    }
})

const MainNavigator = createSwitchNavigator({
    Startup: StartUpScreen,
    Auth: AuthNavigator,
    Feed: MealsNavigator
})

export default createAppContainer(MainNavigator);