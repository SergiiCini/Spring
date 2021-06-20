import {combineReducers} from "redux";
import customerAccountsReducer from "./CustomerAccounts/customerAccountsReducer";
import modalReducer from "./ToggleModal/modalReducer";
import customerReducer from "./Customer/CustomerReducer";
import deleteCustomerReducer from "./Customer/CustomerReducer";
import changeCustomerDataReducer from "./Customer/CustomerReducer";
import employerReducer from "./Employer/EmployerReducer";

const reducer = combineReducers({
    customersList: customerReducer,
    customerAccounts: customerAccountsReducer,
    toggleModal: modalReducer,
    addNewCustomer: customerReducer,
    deleteCustomer: deleteCustomerReducer,
    changeCustomer: changeCustomerDataReducer,
    employersList: employerReducer
})

export default reducer