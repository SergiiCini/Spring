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
import {customerAccountsActions} from "../../redux/CustomerAccounts/customerAccountsActions";
import {customerAccountsSelector} from "../../redux/CustomerAccounts/customerAccountsSelectors";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function renderAccounts(account, currency, balance) {
    return (
        <TableRow key={account}>
            <TableCell component="th" scope="row">{account}</TableCell>
            <TableCell align="right">{currency}</TableCell>
            <TableCell align="right">{balance}</TableCell>
        </TableRow>
    )
}

export default function AccountsTable() {
    const {id} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const curCustomerAccounts = useSelector(customerAccountsSelector);

    useEffect
    (() => {
        dispatch(customerAccountsActions(id))
    }, [dispatch])

    if (curCustomerAccounts.length <= 0) return <p>This customer doesn't have any accounts!</p>
    else if (curCustomerAccounts.length > 0) {
        const accountsData = curCustomerAccounts.map(a => renderAccounts(a.number, a.balance, a.currency))

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account number</TableCell>
                            <TableCell align="right">Balance</TableCell>
                            <TableCell align="right">Account currency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountsData}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


