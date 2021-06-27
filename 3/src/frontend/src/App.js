import './App.css';
import React from "react";
import {useEffect} from "react";
import Paperbase from "./components/Paperbase/Paperbase"
import {useDispatch, useSelector} from "react-redux";
import {customersNumberSelector, customersSelector} from "./redux/Customer/CustomerSelectors";
import {getCustomersAction, getCustomersAmountActions} from "./redux/Customer/CustomerActions";
import {getAllAccounts} from "./redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector} from "./redux/CustomerAccounts/customerAccountsSelectors";
import CircularStatic from "./components/Loader/CircularStatic";

const App = () => {

    const dispatch = useDispatch();
    const customersNumber = useSelector(customersNumberSelector);
    const accounts = useSelector(allAccountsSelector);

    useEffect(() => {
        dispatch(getCustomersAmountActions())
        dispatch(getAllAccounts())
    }, [dispatch])

    return <Paperbase customersNumber={customersNumber} accounts={accounts}/>


}

export default App;
