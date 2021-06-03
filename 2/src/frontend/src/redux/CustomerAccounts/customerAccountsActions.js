import * as actions from '../actionTypes'
import fetch from "unfetch";
import {getCustomersAction} from "../Customer/CustomerActions";
import {TOP_UP_ACCOUNT} from "../actionTypes";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const customerAccountsActions = (id) => (dispatch) => {
    const url = "/api/account/" + id;
    fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            // let currCustomer = data.filter(c => c.id === +id)[0];
            let customerAccounts = data;
            return customerAccounts;
        })
        .then(customerAccounts => {
            dispatch({
                type: actions.GET_CUSTOMER_ACCOUNTS,
                payload: customerAccounts
            })
        })
}

export const getAllAccounts = () => dispatch => {
    fetch("api/account/")
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .then(accounts => {
            dispatch({
                type: actions.GET_ACCOUNTS,
                payload: accounts
            })
        })
}

export const deleteAccountActions = (id) => dispatch => {
    const url = "/api/account/" + id;
    fetch(url, {
        method: "DELETE"
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let updatedAccountsList = data;
            console.log("updated account list: " + updatedAccountsList)
            return updatedAccountsList
        })
        .then(updatedAccountsList => {
            dispatch({
                type: actions.DELETE_ACCOUNT,
                payload: updatedAccountsList
            })
        })
}

export const topUpAccountActions = (transactionData) => dispatch => {
    return fetch("/api/account/top_up", {
        method: "PUT",
        body: JSON.stringify(transactionData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let toppedUpAccount = data;
            return toppedUpAccount;
        })
        .then(toppedUpAccount => {
            dispatch({
                type: actions.TOP_UP_ACCOUNT,
                payload: toppedUpAccount
            })
        })
}

export const withdrawAccountActions = (transactionData) => dispatch => {
    return fetch("/api/account/withdraw", {
        method: "PUT",
        body: JSON.stringify(transactionData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let withDrawAccount = data;
            return withDrawAccount;
        })
        .then(withDrawAccount => {
            dispatch({
                type: actions.WITHDRAW_ACCOUNT,
                payload: withDrawAccount
            })
        })
}

