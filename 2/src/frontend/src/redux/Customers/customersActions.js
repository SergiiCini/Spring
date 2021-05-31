import fetch from 'unfetch';
import * as actions from '../actionTypes';


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




