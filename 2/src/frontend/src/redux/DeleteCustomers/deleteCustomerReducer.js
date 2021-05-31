import * as actions from '../actionTypes'

const initialStore = {
    customerId: {}
}

const deleteCustomerReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.DELETE_CUSTOMER:
            return {
                ...store,
                customerId: action.payload,
            }
        default:
            return store
    }
}

export default deleteCustomerReducer