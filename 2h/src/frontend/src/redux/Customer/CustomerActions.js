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

export const getCustomersAction = () => (dispatch) =>
    fetch("/api/customer")
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
}

// export const openNewAccountActions = (id, currency) => dispatch => {
//     const url = "/api/customer/" + id + "&" + currency;
//     return fetch(url, {
//         method: "PUT",
//     })
//         .then(checkStatus)
//         .then(res => res.json())
//         .then(data => {
//             let customerWithNewAcc = data;
//             return customerWithNewAcc;
//         })
//         .then(customerWithNewAcc => {
//             dispatch({
//                 type: actions.OPEN_ACCOUNT,
//                 payload: customerWithNewAcc
//             })
//         })
// }

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
            let modifyedCustomer = data;
            return modifyedCustomer;
        })
        .then(modifyedCustomer => {
            dispatch({
                type: actions.CHANGE_CUSTOMER_DATA,
                payload: {id, modifyedCustomer},
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

export const deleteCustomerAccountActions = (customerId, accountId) => dispatch =>{
    dispatch({
        type: actions.DELETE_CUSTOMER_ACCOUNT,
        payload: {customerId, accountId}
    })
}


