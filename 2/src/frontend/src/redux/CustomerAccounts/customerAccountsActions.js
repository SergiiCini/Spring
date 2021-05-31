import * as actions from '../actionTypes'
import fetch from "unfetch";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const customerAccountsActions = (id) => (dispatch) => {
    fetch("/api/customer")
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let currCustomer = data.filter(c => c.id === +id)[0];
            let customerAccounts = currCustomer.accounts;
            return customerAccounts
        })
        .then(customerAccounts => {
            dispatch({
                type: actions.GET_CUSTOMER_ACCOUNTS,
                payload: customerAccounts
            })
        })
}

