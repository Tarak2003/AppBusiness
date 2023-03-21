import Restaurant from "../../models/restaurant";
import * as FileSystem from 'expo-file-system'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(
                'https://zing-be596-default-rtdb.firebaseio.com/restaurant.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Restaurant(
                        key,
                        resData[key].ownerId,
                        resData[key].restaurantName,
                        resData[key].imageUrl,
                        resData[key].location,
                        resData[key].description
                    )
                );
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.ownerId === userId) });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        await fetch(
            `https://zing-be596-default-rtdb.firebaseio.com/restaurant/${productId}.json?auth=${token}`, {
                method: 'DELETE'
            }
        );
        dispatch({ type: DELETE_PRODUCT, pid: productId });
    };
};

export const createProduct = (restaurantName, imageUrl, location, description) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(
            `https://zing-be596-default-rtdb.firebaseio.com/restaurant.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantName,
                    imageUrl,
                    location,
                    description,
                    ownerId: userId
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                restaurantName,
                imageUrl,
                location,
                description,
                ownerId: userId
            }
        });
    };
};

export const updateProduct = (id, restaurantName, imageUrl, loation, description) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        await fetch(
            `https://zing-be596-default-rtdb.firebaseio.com/restaurant/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantName,
                    imageUrl,
                    location,
                    description
                })
            }
        );

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                restaurantName,
                imageUrl,
                loation,
                description
            }
        });
    };
};