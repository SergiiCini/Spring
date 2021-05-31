import * as actions from '../actionTypes'

const initialStore = {
    customerDataToModify: {},
    customerId:{}
}

const changeCustomerDataReducer = (store = initialStore, action) => {
    switch (action.type){
        case actions.CHANGE_CUSTOMER_DATA:
            const {id, customerData} = action.payload;
            return {
                ...store,
                customerDataToModify: customerData,
                customerId: id
            }
        default:
           return store
    }
}

export default changeCustomerDataReducer