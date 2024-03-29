import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(
                'https://zing-be596-default-rtdb.firebaseio.com/products.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].price,
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
            `https://zing-be596-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: 'DELETE'
            }
        );
        dispatch({ type: DELETE_PRODUCT, pid: productId });
    };
};

export const createProduct = (title, imageUrl, price, description) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(
            `https://zing-be596-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                    ownerId: userId
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: userId,
                title,
                imageUrl,
                price,
                description,
                ownerId: userId
            }
        });
    };
};

export const updateProduct = (id, title, imageUrl, price, description) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(
            `https://zing-be596-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                imageUrl,
                price,
                description
            }
        });
    };
};