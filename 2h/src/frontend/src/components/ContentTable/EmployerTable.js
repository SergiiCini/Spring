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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {allEmployersSelector} from "../../redux/Employer/EmployerSelector";
import {allEmployersActions, removeEmployerActions} from "../../redux/Employer/EmployerActions";
import {getCustomersAction} from "../../redux/Customer/CustomerActions";
import {customersSelector} from "../../redux/Customer/CustomerSelectors";
import {useParams} from "react-router";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    accTable: {
        fontWeight: "bold",
    }
});

export default function EmployerTable() {
    const {id} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const employers = useSelector(allEmployersSelector)
    const customers = useSelector(customersSelector)

    useEffect
    (() => {
        dispatch(allEmployersActions());
        dispatch(getCustomersAction())
    }, [dispatch])

    const renderData = (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className={classes.accTable}>Company name</TableCell>
                        <TableCell align="center" className={classes.accTable}>Company address</TableCell>
                        <TableCell align="center" className={classes.accTable}>Employee</TableCell>
                        <TableCell align="center" className={classes.accTable}>Remove employer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getDataToRender()}
                </TableBody>
            </Table>
        </TableContainer>
    );

    if (employers.length <= 0) return <p>There are no employers data yet!</p>
    else if (employers.length > 0) {
        return renderData
    }

    function renderAccounts(empId, name, address, employee) {
        return (
            <TableRow hover key={name + empId}>
                <TableCell align="center" component="th" scope="row">{name}</TableCell>
                <TableCell align="center">{address}</TableCell>
                <TableCell align="center">{employee}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => {
                            dispatch(removeEmployerActions(empId));
                        }
                        }/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }

    function getDataToRender() {
        if (!id)
            return employers.map(e => renderAccounts(e.id, e.name, e.address, getEmployeeName(e.id)))
        else if (+id > 0)
            return customers.filter(c => c.id === +id)[0].employers.map(e => renderAccounts(e.id, e.name, e.address, getEmployeeName(e.id)))
    }

    function getEmployeeName(id) {
        let employee = "";
        customers.forEach(c => c.employers.forEach(e => {
            if (e.id === id) employee = c.name
        }));
        return employee;
    }
}


