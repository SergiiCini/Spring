import {combineReducers} from "redux";
import customersReducer from "./Customers/customersReducer";
import customerAccountsReducer from "./CustomerAccounts/customerAccountsReducer";
import modalReducer from "./ToggleModal/modalReducer";
import addNewCustomerReducer from "./AddNewCustomer/addNewCustomerReducer";
import deleteCustomerReducer from "./DeleteCustomers/deleteCustomerReducer";
import changeCustomerDataReducer from "./ChangeCustomerData/changeCustomerDataReducer";

const reducer = combineReducers({
    customersList: customersReducer,
    customerAccounts: customerAccountsReducer,
    toggleModal: modalReducer,
    addNewCustomer: addNewCustomerReducer,
    deleteCustomer: deleteCustomerReducer,
    changeCustomer: changeCustomerDataReducer
})

export default reducer