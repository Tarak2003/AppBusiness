import Order from '../../models/order';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(
                'https://zjkdbfkugwe-default-rtdb.firebaseio.com/orders.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date),
                        resData[key].userId,
                        resData[key].restaurantName,
                        resData[key].user
                    )
                );
            }
            dispatch({ type: SET_ORDER, order: loadedOrders.filter(prod => prod.userId === userId) });
        } catch (err) {
            throw err;
        }
    };
};