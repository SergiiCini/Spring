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
} from "../../redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector, customerAccountsSelector} from "../../redux/CustomerAccounts/customerAccountsSelectors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MoneyIcon from '@material-ui/icons/Money';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {deleteCustomerAccountActions} from "../../redux/Customer/CustomerActions";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {customersNumberSelector} from "../../redux/Customer/CustomerSelectors";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    accTable: {
        fontWeight: "bold",
    },
    noData: {
        fontSize: 18,
        display: "flex",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 25
    }
});

export default function AccountsTable() {
    const {id} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const curCustomerAccounts = useSelector(customerAccountsSelector)
    const accounts = useSelector(allAccountsSelector)
    const customersAmount = useSelector(customersNumberSelector);

    useEffect
    (() => {
        dispatch(customerAccountsActions(id));
    }, [dispatch, id, accounts, customersAmount])

    if (curCustomerAccounts.length <= 0) return <p className={classes.noData}>This customer doesn't have any accounts!</p>
    else if (curCustomerAccounts.length > 0) {
        const accountsData = curCustomerAccounts.map(a => renderAccounts(a.number, a.balance, a.currency, a.id))

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.accTable}>Account number</TableCell>
                            <TableCell align="center" className={classes.accTable}>Balance</TableCell>
                            <TableCell align="center" className={classes.accTable}>Account currency</TableCell>
                            <TableCell align="center" className={classes.accTable}>Top-up balance</TableCell>
                            <TableCell align="center" className={classes.accTable}>To cash</TableCell>
                            <TableCell align="center" className={classes.accTable}>Remove account</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountsData}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    function renderAccounts(account, currency, balance, accId) {
        return (
            <TableRow hover key={account}>
                <TableCell component="th" scope="row">{account}</TableCell>
                <TableCell align="right">{currency}</TableCell>
                <TableCell align="right">{balance}</TableCell>
                <TableCell align="center"><AddCircleOutlineIcon cursor="pointer"
                                                                onClick={() => dispatch(toggleModalAction("top-up", id, accId))}/></TableCell>
                <TableCell align="center"><MoneyIcon cursor="pointer"
                                                     onClick={() => dispatch(toggleModalAction("withdraw", id, accId))}/></TableCell>
                <TableCell align="center">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => {
                            dispatch(deleteAccountActions(accId, customersAmount));
                            dispatch(deleteCustomerAccountActions(id, accId))
                        }
                        }/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}


