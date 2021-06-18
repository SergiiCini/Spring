import './App.css';
import React from "react";
import {useEffect} from "react";
import Paperbase from "./components/Paperbase/Paperbase"
import {useDispatch, useSelector} from "react-redux";
import {customersSelector} from "./redux/Customer/CustomerSelectors";
import {getCustomersAction} from "./redux/Customer/CustomerActions";
import Loader from "./components/Loader/CircularStatic";
import {getAllAccounts} from "./redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector} from "./redux/CustomerAccounts/customerAccountsSelectors";

const App = () => {

    const dispatch = useDispatch();
    const customers = useSelector(customersSelector);
    const accounts = useSelector(allAccountsSelector);

    useEffect(() => {
        dispatch(getCustomersAction())
        dispatch(getAllAccounts())
        }, [dispatch])

    return <Paperbase customers={customers} accounts={accounts}/>

    // customers.length === 0 ? <CircularStatic /> :

}

export default App;
