import * as actions from '../actionTypes'
import fetch from "unfetch";
import {getAllAccounts} from "../CustomerAccounts/customerAccountsActions";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getCustomersAction = (page, rowsPerPage) => (dispatch) =>
    fetch("/api/customer?pageSize=" + rowsPerPage + "&pageNumber=" + page)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let customersList = data;
            return customersList;
        })
        .then(customersList => {
            dispatch({
                type: actions.GET_CUSTOMERS,
                payload: customersList
            })
        })
        .then (() => dispatch(getCustomersAmountActions()))


export const getCustomersAmountActions = () => dispatch => {
    fetch("/api/customer/pages")
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let customersAmount = data;
            return customersAmount;
        })
        .then(customersAmount => {
            dispatch({
                type: actions.GET_CUSTOMERS_AMOUNT,
                payload: customersAmount
            })
        })
}

export const addNewCustomerActions = (newCustomerData) => (dispatch) => {
    return fetch("/api/customer", {
        method: "POST",
        body: JSON.stringify(newCustomerData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let newCustomer = data;
            return newCustomer;
        })
        .then(newCustomer => {
            dispatch({
                type: actions.ADD_NEW_CUSTOMER,
                payload: newCustomer
            })
        })
        .then (() => dispatch(getCustomersAmountActions()))

}

export const changeCustomerActions = (id, customerData) => (dispatch) => {
    const url = "/api/customer/modify/" + id;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(customerData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let modifiedCustomer = data;
            return modifiedCustomer;
        })
        .then(modifiedCustomer => {
            dispatch({
                type: actions.CHANGE_CUSTOMER_DATA,
                payload: {id, modifiedCustomer},
            })
        })
}

export const deleteCustomerActions = (custId) => dispatch => {
    const url = "/api/customer/" + custId;
    return fetch(url, {
        method: "DELETE"
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let deletedCustomer = data;
            return deletedCustomer;
        })
        .then(deletedCustomer => {
            dispatch({
                type: actions.DELETE_CUSTOMER,
                payload: {custId, deletedCustomer},
            })
        })
        .then(() => dispatch(getAllAccounts()))
}

export const deleteCustomerAccountActions = (customerId, accountId) => dispatch => {
    dispatch({
        type: actions.DELETE_CUSTOMER_ACCOUNT,
        payload: {customerId, accountId}
    })
}

export const findByNameActions = (inputData) => dispatch => {
    dispatch({
        type: actions.FIND_CUSTOMER_BY_NAME,
        payload: inputData
    })
}

