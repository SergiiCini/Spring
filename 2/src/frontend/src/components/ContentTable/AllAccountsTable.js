import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    customerAccountsActions,
    deleteAccountActions,
    getAllAccounts
} from "../../redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector, customerAccountsSelector} from "../../redux/CustomerAccounts/customerAccountsSelectors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoneyIcon from '@material-ui/icons/Money';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {deleteCustomerAccountActions, getCustomersAction} from "../../redux/Customer/CustomerActions";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {customersSelector} from "../../redux/Customer/CustomerSelectors";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    accTable: {
        fontWeight: "bold",
    }
});

export default function AllAccountsTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allAccounts = useSelector(allAccountsSelector);
    const allCustomers = useSelector(customersSelector);

    useEffect(() => {
        dispatch(getCustomersAction())
        dispatch(getAllAccounts())
    }, [])

    if (allAccounts.length <= 0) return <p>There are no accounts yet!</p>

    else if (allAccounts.length >= 1) {

        const accountsData = allAccounts.map(a => renderAccounts(a.number, a.balance, a.currency, getAccountOwner(a.accountOwnerId)))

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.accTable}>Account number</TableCell>
                            <TableCell align="center" className={classes.accTable}>Balance</TableCell>
                            <TableCell align="center" className={classes.accTable}>Account currency</TableCell>
                            <TableCell align="center" className={classes.accTable}>Account owner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountsData}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    function renderAccounts(account, currency, balance, name, id, ownerId) {
        return (
            <TableRow hover key={account}>
                <TableCell component="th" scope="row">{account}</TableCell>
                <TableCell align="center">{currency}</TableCell>
                <TableCell align="center">{balance}</TableCell>
                <TableCell align="center">{name}</TableCell>
            </TableRow>
        )
    }

    function getAccountOwner(ownerId) {
        console.log("OwnerId: " + ownerId)
        console.log("allCustomers: " + allCustomers[0].id)
        return allCustomers.filter(c => c.id === ownerId)[0].name;
    }

}


