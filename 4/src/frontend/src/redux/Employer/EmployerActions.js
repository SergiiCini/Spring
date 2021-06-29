import fetch from "unfetch";
import * as actions from "../actionTypes";
import {getCustomersAction} from "../Customer/CustomerActions";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const allEmployersActions = () => dispatch => {
    fetch("/api/employer")
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let allEmployers = data;
            return allEmployers
        })
        .then(allEmployers => {
            dispatch({
                type: actions.GET_EMPLOYERS,
                payload: allEmployers
            })
        })
}

export const addCustomerEmployerActions = (id, customerEmployerData) => dispatch => {
    const url = "/api/customer/new_employer_" + id;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(customerEmployerData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let customerEmployers = data;
            return customerEmployers;
        })
        .then(customerEmployers => {
            dispatch({
                type: actions.ADD_NEW_EMPLOYER,
                payload: customerEmployers
            })
        })
}

export const removeEmployerActions = (id, customersAmount) => dispatch => {
    return fetch("/api/employer/" + id, {
        method: "DELETE",
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(data => {
            let employersList = data;
            return employersList;
        })
        .then(employersList => {
            dispatch({
                type: actions.DELETE_EMPLOYER_BY_ID,
                payload: employersList
            })
        })
        .then(() => dispatch(getCustomersAction(0 ,customersAmount)))
}