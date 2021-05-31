import * as actions from '../actionTypes'
import {getCustomersAction} from "../Customers/customersActions";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const deleteCustomerActions = (customerId) => dispatch => {
    dispatch({
        type: actions.DELETE_CUSTOMER,
        payload: customerId,
    })
    const url = "/api/customer/" + customerId;
    return fetch(url, {
        method: "DELETE"
    })
        .then(checkStatus)
        .then(() => dispatch(getCustomersAction()))
}