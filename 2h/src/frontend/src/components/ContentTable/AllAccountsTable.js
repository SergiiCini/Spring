import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {getAllAccounts} from "../../redux/CustomerAccounts/customerAccountsActions";
import {allAccountsSelector} from "../../redux/CustomerAccounts/customerAccountsSelectors";
import {getCustomersAction} from "../../redux/Customer/CustomerActions";
import {customersSelector} from "../../redux/Customer/CustomerSelectors";

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

export default function AllAccountsTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allAccounts = useSelector(allAccountsSelector);
    const allCustomers = useSelector(customersSelector);

    useEffect(() => {
        dispatch(getCustomersAction())
        dispatch(getAllAccounts())
    }, [dispatch])

    if (allAccounts.length <= 0) return <p className={classes.noData}>There are no accounts yet!</p>

    else if (allAccounts.length >= 1) {

        const accountsData = allAccounts.map(a => renderAccounts(a.number, a.balance, a.currency, getAccountOwner(a.id)))

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

    function renderAccounts(account, currency, balance, name) {
        return (
            <TableRow hover key={account}>
                <TableCell component="th" scope="row">{account}</TableCell>
                <TableCell align="center">{currency}</TableCell>
                <TableCell align="center">{balance}</TableCell>
                <TableCell align="center">{name}</TableCell>
            </TableRow>
        )
    }

    function getAccountOwner(accId) {
        let accOwnerName = "";
        allCustomers.forEach(c => c.accounts.forEach(a => {
            if (a.id === accId) accOwnerName = c.name
        }));
        return accOwnerName;
    }
}


