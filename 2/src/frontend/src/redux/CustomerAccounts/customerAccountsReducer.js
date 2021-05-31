import * as actions from "../actionTypes";

const initialStore = {
    customerAcc: [],
}
const customerAccountsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMER_ACCOUNTS:
            return {
                ...store,
                customerAcc: action.payload
            }
        default:
            return store;
    }
}

export default customerAccountsReducer