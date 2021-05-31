import {useEffect, useState} from "react";
import {getAllCustomers} from "./client";

function GetCustomerData(){
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        console.log("component is mounted");
        fetchCustomers();
    }, []);

    const fetchCustomers = () => getAllCustomers()
        .then(res => res.json())
        .then(data => setCustomers(data))

    if (customers.length <= 0) return "no data";

    return customers;
}

export default GetCustomerData;