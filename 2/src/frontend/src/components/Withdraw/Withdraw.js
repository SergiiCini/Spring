import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {TextField} from 'formik-material-ui';
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {addNewCustomerActions} from "../../redux/Customer/CustomerActions";
import {modalGetAccountId, modalGetCustomerId} from "../../redux/ToggleModal/modalSelector";
import {allAccountsSelector, customerAccountsSelector} from "../../redux/CustomerAccounts/customerAccountsSelectors";
import {
    customerAccountsActions,
    getAllAccounts,
    withdrawAccountActions
} from "../../redux/CustomerAccounts/customerAccountsActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        height: 370,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    form: {
        marginTop: 10,
    },
    buttons_form: {
        marginTop: 35,
        display: 'flex',
        justifyContent: 'center'
    },
    button_distance_left: {
        marginRight: 30
    },
    button_distance_right: {
        marginLeft: 30
    },
    field_data: {
        width: 300,
    }
}))

function Withdraw() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const accountId = useSelector(modalGetAccountId);
    const customerId = useSelector(modalGetCustomerId);
    const curCustomerAccounts = useSelector(customerAccountsSelector);
    const currAccountNumber = curCustomerAccounts.filter(a => a.id === +accountId)[0].number;
    const currAccountCurrency = curCustomerAccounts.filter(a => a.id === +accountId)[0].currency;

    useEffect
    (() => {
        dispatch(customerAccountsActions(customerId))
    }, [])
    const accountBalance = curCustomerAccounts.filter(a => a.id === +accountId)[0].balance;

    return (
        <div className='checkout'>
            <h4 align="center">{"Enter amount you want to cash"}</h4>
            <Formik
                initialValues={{
                    accountToWithdraw: currAccountNumber,
                    currency: currAccountCurrency,
                    transactionAmount: ''
                }}
                validationSchema={Yup.object().shape({
                    transactionAmount: Yup.number()
                        .moreThan(0, 'Cash amount should be positive!')
                        .lessThan(accountBalance, 'Not enough money to cash! ')
                        .required('Cash amount is required!'),
                })}
                onSubmit={(fields) => {
                    dispatch(withdrawAccountActions(fields));
                    dispatch(toggleModalAction());
                }}
                render={({errors, status, touched}) => (
                    <Form align="center" className={classes.root}>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} disabled id="standard-basic"
                                   helperText="Account To Withdraw" name="accountToWithdraw" type="text"/>
                        </div>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} disabled id="standard-basic"
                                   helperText="Account currency" name="currency" type="text"/>
                        </div>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} id="standard-basic" label="Cash amount"
                                   helperText="Please cash amount" name="transactionAmount" type="text"/>
                        </div>
                        <div className={classes.buttons_form}>
                            <div className={classes.button_distance_left}>
                                <Button variant="contained" color="primary" type="submit"
                                        className="btn btn-primary mr-2">To Cash</Button>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" type="reset"
                                        className="btn btn-secondary">Reset</Button>
                            </div>
                        </div>
                    </Form>
                )}
            />
        </div>
    )
}

export default Withdraw