import * as actions from '../actionTypes'

const initialStore = {
    customers: []
}

const customerReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMERS:
            return {
                ...store,
                customers: action.payload,
            }
        case actions.ADD_NEW_CUSTOMER:
            const currentCustomers = [...store.customers];
            currentCustomers.push(action.payload);
            return {
                ...store,
                customers: currentCustomers,
            }
        // case actions.OPEN_ACCOUNT:
        //     const currentCustomersData = [...store.customers];
        //     const currCustomer = action.payload;
        //     currentCustomersData.filter(c => c.id === currCustomer.id)[0].accounts = currCustomer.accounts;
        //     return {
        //         ...store,
        //         customers: currentCustomersData
        //     }
        case actions.CHANGE_CUSTOMER_DATA:
            const {id, modifyedCustomer} = action.payload;
            const changeCustomersStore = [...store.customers];
            changeCustomersStore.filter(c => c.id === id)[0].name = modifyedCustomer.name;
            changeCustomersStore.filter(c => c.id === id)[0].age = modifyedCustomer.age;
            changeCustomersStore.filter(c => c.id === id)[0].email = modifyedCustomer.email;
            return {
                ...store,
                customers: changeCustomersStore,
            }
        case actions.DELETE_CUSTOMER:
            const deletedCustomersData = [...store.customers];
            const {custId} = action.payload;
            const newCustomersArr = deletedCustomersData.filter(c => c.id !== +custId);
            return {
                ...store,
                customers: newCustomersArr,
            }
        case actions.DELETE_CUSTOMER_ACCOUNT:
            const customersData = [...store.customers];
            const {customerId, accountId} = action.payload;
            const currentCustomerAccounts = customersData.filter(c => c.id === +customerId)[0].accounts;
            const filteredAccounts = currentCustomerAccounts.filter(a => a !== accountId);
            customersData.filter(c => c.id === +customerId)[0].accounts = filteredAccounts;
            return {
                ...store,
                customers: customersData
            }
        default:
            return store
    }
}

export default customerReducer


