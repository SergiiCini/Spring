import './App.css';
import React from "react";
import {useEffect} from "react";
import Paperbase from "./components/Paperbase/Paperbase"
import {useDispatch, useSelector} from "react-redux";
import {customersSelector} from "./redux/Customer/CustomerSelectors";
import {getCustomersAction} from "./redux/Customer/CustomerActions";
import Loader from "./components/Loader/Loader";
import {getAllAccounts} from "./redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector} from "./redux/CustomerAccounts/customerAccountsSelectors";

const App = () => {

    const dispatch = useDispatch();
    const customers = useSelector(customersSelector);
    const accounts = useSelector(allAccountsSelector);


    useEffect(() => {
        dispatch(getCustomersAction())
        dispatch(getAllAccounts())
        }, [])

    return <Paperbase customers={customers} account={accounts}/>

    // customers.length === 0 ? <Loader /> :

}

export default App;
