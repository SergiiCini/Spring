import React from "react";
import {Route, Switch} from "react-router";
import NotFound from "../components/Pages/NotFound/NotFound";
import CustomersTable from "../components/ContentTable/CustomersTable";
import AccountsTable from "../components/ContentTable/AccountsTable";
import TransitionsModal from "../components/Modal/TransitionsModal";

const AppRoutes = (props) => {
    const {customers} = props;

    return (
        <Switch>
            <Route exact path="/" render={() => <CustomersTable customers={customers}/>}/>
            <Route exact path="/customer" render={() => <CustomersTable customers={customers}/>}/>
            <Route exact path="/accounts/:id/" render={() => <AccountsTable/>}/>
            <Route exact path="/account" component={TransitionsModal}/>
            <Route exact path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;