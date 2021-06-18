import * as actions from "../actionTypes";

const initialStore = {
    accounts: [],
    customerAcc: [],
}
const customerAccountsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.GET_ACCOUNTS:
            return {
                ...store,
                accounts: action.payload
            }
        case actions.GET_CUSTOMER_ACCOUNTS:
            return {
                ...store,
                customerAcc: action.payload
            }
        case actions.DELETE_ACCOUNT:
            return {
                ...store,
                customerAcc: action.payload
            }
        case actions.TOP_UP_ACCOUNT:
            const allCustomerAccounts = [...store.customerAcc];
            allCustomerAccounts.filter(a => a.id === action.payload.id)[0].balance = action.payload.balance;
            return {
                ...store,
                customerAcc: allCustomerAccounts
            }
        case actions.WITHDRAW_ACCOUNT:
            const allCustomerAcc = [...store.customerAcc];
            allCustomerAcc.filter(a => a.id === action.payload.id)[0].balance = action.payload.balance;
            return {
                ...store,
                customerAcc: allCustomerAcc
            }
        case actions.SEND_MONEY:
            return {
                ...store,
                accounts: action.payload
            }
        case actions.OPEN_ACCOUNT:
            return {
                ...store,
                customerAcc: action.payload
            }
        default:
            return store;
    }
}

export default customerAccountsReducer