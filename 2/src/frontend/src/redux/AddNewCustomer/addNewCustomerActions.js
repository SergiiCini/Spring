import * as actions from '../actionTypes'
import {getCustomersAction} from "../Customers/customersActions";
import {OPEN_ACCOUNT} from "../actionTypes";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const addNewCustomerActions = (newCustomerData) => (dispatch) => {
    dispatch({
        type: actions.ADD_NEW_CUSTOMER,
        payload: newCustomerData,
    })

    return fetch("/api/customer", {
        method: "POST",
        body: JSON.stringify(newCustomerData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(() => dispatch(getCustomersAction()))
}

export const openNewAccountActions = (id) => dispatch => {
    dispatch({
        type: OPEN_ACCOUNT,
        payload: id
    })
    const url = "/api/customer/" + id;
    return fetch(url, {
        method: "PUT"
    })
        .then(checkStatus)
        .then(() => dispatch(getCustomersAction()))
}


