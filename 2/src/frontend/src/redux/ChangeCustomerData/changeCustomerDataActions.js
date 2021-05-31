import * as actions from "../actionTypes";
import {getCustomersAction} from "../Customers/customersActions";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const changeCustomerActions = (id, customerData) => (dispatch) => {
    dispatch({
        type: actions.CHANGE_CUSTOMER_DATA,
        payload: {id, customerData},
    })
    const url = "/api/customer/modify/" + id;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(customerData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(() => dispatch(getCustomersAction()))
}