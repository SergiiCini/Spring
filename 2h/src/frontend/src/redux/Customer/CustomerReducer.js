import * as actions from '../actionTypes'

const initialStore = {
    customers: [],
    filteredCustomers: []
}

const customerReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMERS:
            return {
                ...store,
                customers: action.payload,
                filteredCustomers: action.payload
            }
        case actions.ADD_NEW_CUSTOMER:
            const currentCustomers = [...store.customers];
            currentCustomers.push(action.payload);
            return {
                ...store,
                customers: currentCustomers,
                filteredCustomers: currentCustomers
            }
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
                filteredCustomers: newCustomersArr
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
        case actions.FIND_CUSTOMER_BY_NAME:
            const customersToMod = [...store.customers];
            let customerToFind;
            let {inputData} = action.payload;
            if (inputData !== "") {
                customerToFind = customersToMod.filter(c => {
                    return (c.name.indexOf(action.payload) !== -1 || c.email.indexOf(action.payload) !== -1)
                })
            }
            return {
                ...store,
                filteredCustomers: customerToFind
            }
        default:
            return store
    }
}

export default customerReducer


