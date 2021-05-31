import * as actions from "../actionTypes";

const initialStore = {
    customers: []
}

const customersReducer = (store = initialStore, action) => {

    switch (action.type) {
        case actions.GET_CUSTOMERS:
            return {
                ...store,
                customers: action.payload,
            }
        default:
            return store
    }

}

export default customersReducer