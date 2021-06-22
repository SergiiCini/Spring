import './App.css';
import React from "react";
import {useEffect} from "react";
import Paperbase from "./components/Paperbase/Paperbase"
import {useDispatch, useSelector} from "react-redux";
import {customersSelector} from "./redux/Customer/CustomerSelectors";
import {getCustomersAction} from "./redux/Customer/CustomerActions";
import {getAllAccounts} from "./redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector} from "./redux/CustomerAccounts/customerAccountsSelectors";
import CircularStatic from "./components/Loader/CircularStatic";

const App = () => {

    const dispatch = useDispatch();
    const customers = useSelector(customersSelector);
    const accounts = useSelector(allAccountsSelector);

    useEffect(() => {
        dispatch(getCustomersAction())
        dispatch(getAllAccounts())
    }, [dispatch])

    return <Paperbase customers={customers} accounts={accounts}/>


}

export default App;
