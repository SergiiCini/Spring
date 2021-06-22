import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {TextField} from 'formik-material-ui';
import {getAllAccounts, sendMoneyActions} from "../../redux/CustomerAccounts/customerAccountsActions";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },
    heading: {
        marginTop: 50,
    },
    root: {
        width: 400,
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
        width: 350,
    }
}))

function SendMoney() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect
    (() => {
        dispatch(getAllAccounts())
    }, [dispatch])

    return (
        <div className={classes.main}>
            <h3 className={classes.heading}
                align="center">{"Please enter the sender, receiver accounts and amount you want to send"}</h3>
            <Formik
                initialValues={{
                    accountToWithdraw: '',
                    accountToReceive: '',
                    transactionAmount: ''
                }}
                validationSchema={Yup.object().shape({
                    accountToWithdraw: Yup.string()
                        .required('Sender account is required'),
                    accountToReceive: Yup.string()
                        .required('Receiver account is required'),
                    transactionAmount: Yup.number()
                        .moreThan(0, 'Cash amount should be positive!')
                        .required('Cash amount is required!'),
                })}
                onSubmit={(fields, {resetForm}) => {
                    dispatch(sendMoneyActions(fields));
                    resetForm();
                }}
                render={({errors, status, touched}) => (
                    <Form align="center" className={classes.root}>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} id="standard-basic"
                                   label="Account to send" helperText="Account To Send" name="accountToWithdraw"
                                   type="text"/>
                        </div>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} id="standard-basic"
                                   label="Account to receive" helperText="Account To Receive" name="accountToReceive"
                                   type="text"/>
                        </div>
                        <div align="center" className={classes.form}>
                            <Field className={classes.field_data} component={TextField} id="standard-basic"
                                   label="Transaction Amount"
                                   helperText="Amount to send" name="transactionAmount" type="text"/>
                        </div>
                        <div className={classes.buttons_form}>
                            <div className={classes.button_distance_left}>
                                <Button variant="contained" color="primary" type="submit"
                                        className="btn btn-primary mr-2">Send</Button>
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


export default SendMoney