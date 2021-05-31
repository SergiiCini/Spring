import './App.css';
import React from "react";
import {useEffect} from "react";
import Paperbase from "./components/Paperbase/Paperbase"
import {useDispatch, useSelector} from "react-redux";
import {customersSelector} from "./redux/Customers/customersSelector";
import {getCustomersAction} from "./redux/Customers/customersActions";
import Loader from "./components/Loader/Loader";

const App = () => {

    const dispatch = useDispatch();
    const customers = useSelector(customersSelector);

    useEffect(() => {
        dispatch(getCustomersAction())
    }, [dispatch])

    return <Paperbase customers={customers}/>

    // customers.length === 0 ? <Loader /> :

}

export default App;
