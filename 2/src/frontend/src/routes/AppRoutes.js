import React from "react";
import {Route, Switch} from "react-router";
import NotFound from "../components/Pages/NotFound/NotFound";
import CustomersTable from "../components/ContentTable/CustomersTable";
import AccountsTable from "../components/ContentTable/AccountsTable";
import AllAccountsTable from "../components/ContentTable/AllAccountsTable";
import SendMoney from "../components/SendMoney/SendMoney";
import IncorrectDataRoute from "./IncorrectDataRoute";

const AppRoutes = (props) => {
    const {customers} = props;

    return (
        <Switch>
            <Route exact path="/" render={() => <CustomersTable customers={customers}/>}/>
            <Route exact path="/customer" render={() => <CustomersTable customers={customers}/>}/>
            <Route exact path="/accounts/:id/" render={() => <AccountsTable/>}/>
            <Route exact path="/accounts" render={() => <AllAccountsTable/>}/>
            <Route exact path="/sendmoney" render={() => <SendMoney/>}/>
            <Route exact path="/incorrectAccountData" render={() => <IncorrectDataRoute/>}/>
            <Route exact path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;