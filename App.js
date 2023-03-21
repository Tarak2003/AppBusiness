import React from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducer/products';
import NavigationContainer from './navigations/shopNavigator';
import authReducer from './store/reducer/auth'
import restaurantReducer from './store/reducer/restaurantEntry'
import orderReducer from './store/reducer/order'

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  restaurant: restaurantReducer,
  orders: orderReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}