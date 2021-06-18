import * as actions from '../actionTypes'
import fetch from "unfetch";
import {toggleModalAction} from "../ToggleModal/modalActions";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    if (response.status === 406) response.statusText = "Incorrect account data! Please check sender or receiver account number!"
    if (response.status === 405) response.statusText = "Don't enough money on Sender account! PLease check sender account balance and try again!"
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
    console.log(transactionData)
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

export const sendMoneyActions = (transactionalData) => dispatch => {
    return fetch("/api/account/send_money", {
        method: "PUT",
        body: JSON.stringify(transactionalData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let sendInfo = data;
            if(data) dispatch(toggleModalAction("success"))
            return sendInfo;
        })
        .then(sendInfo => {
            dispatch({
                type: actions.SEND_MONEY,
                payload: sendInfo
            })
        })
}

export const openNewAccountActions = (id, currency) => dispatch => {
    const url = "/api/customer/" + id + "&" + currency;
    return fetch(url, {
        method: "PUT",
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let customerWithNewAcc = data;
            return customerWithNewAcc;
        })
        .then(customerWithNewAcc => {
            dispatch({
                type: actions.OPEN_ACCOUNT,
                payload: customerWithNewAcc
            })
        })
        .then(()=> dispatch(getAllAccounts()))
}

