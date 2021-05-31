import * as actions from '../actionTypes'

const initialStore = {
    newCustomerData: {},
    customerId: {}
}

const addNewCustomerReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.ADD_NEW_CUSTOMER:
            return {
                ...store,
                newCustomerData: action.payload,
            }

        case actions.OPEN_ACCOUNT:
            return {
                ...store,
                customerId: action.payload
            }
        default:
            return store
    }
}

export default addNewCustomerReducer