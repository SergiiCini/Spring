import React from "react";
import {Route, Switch} from "react-router";
import NotFound from "../components/Pages/NotFound/NotFound";
import CustomersTable from "../components/ContentTable/CustomersTable";
import AccountsTable from "../components/ContentTable/AccountsTable";
import AllAccountsTable from "../components/ContentTable/AllAccountsTable";
import SendMoney from "../components/SendMoney/SendMoney";
import IncorrectDataRoute from "./IncorrectDataRoute";
import EmployerTable from "../components/ContentTable/EmployerTable";

const AppRoutes = (props) => {
    const {customers, accounts} = props;

    return (
        <Switch>
            <Route exact path="/" render={() => <CustomersTable customers={customers} accounts={accounts}/>}/>
            <Route exact path="/customer" render={() => <CustomersTable customers={customers}/>}/>
            <Route exact path="/accounts/:id/" render={() => <AccountsTable/>}/>
            <Route exact path="/accounts" render={() => <AllAccountsTable/>}/>
            <Route exact path="/sendmoney" render={() => <SendMoney/>}/>
            <Route exact path="/employers" render={() => <EmployerTable/>}/>
            <Route exact path="/employers/:id/" render={() => <EmployerTable/>}/>
            <Route exact path="/incorrectAccountData" render={() => <IncorrectDataRoute/>}/>
            <Route exact path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;