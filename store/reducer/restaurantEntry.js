import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS
} from '../actions/restaurantEntry';
import Restaurant from '../../models/restaurant';

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            };
        case CREATE_PRODUCT:
            const newProduct = new Restaurant(
                action.productData.id,
                action.productData.ownerId,
                action.productData.restaurantName,
                action.productData.imageUrl,
                action.productData.location,
                action.productData.description
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedProduct = new Restaurant(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.restaurantName,
                action.productData.imageUrl,
                action.productData.location,
                action.productData.description
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                )
            };
    }
    return state;
};