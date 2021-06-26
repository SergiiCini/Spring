import React from "react";
import {useDispatch} from "react-redux";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {TextField} from 'formik-material-ui';
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {addNewCustomerActions} from "../../redux/Customer/CustomerActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    form: {
        marginTop: 10,
    },
    buttons_form: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    button_distance_left: {
        marginRight: 30
    },
    button_distance_right: {
        marginLeft: 30
    }
}))

const AddNewCustomer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className='checkout'>
            <h4 align="center">{"Please enter customer data below"}</h4>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    cell: '',
                    age: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    cell: Yup.string()
                        .matches('^(\\+\\d{1,3}( )?)?\\d{11}$', 'Cell number begins +380')
                        .required('Cell number is required'),
                    age: Yup.number()
                        .moreThan(17, 'Your age should be not less than 18 years')
                        .required('Age is required'),
                })}
                onSubmit={(fields) => {
                    dispatch(addNewCustomerActions(fields));
                    dispatch(toggleModalAction());
                }}
                render={({errors, status, touched}) => (
                    <Form className={classes.root}>
                        <div className={classes.form}>
                            <Field component={TextField} label="Name"
                                   helperText="Please Enter Your FirstName and LastName" name="name"
                                   type="text"/>
                        </div>
                        <div className={classes.form}>
                            <Field component={TextField} label="Email"
                                   helperText="Please Enter Email" name="email" type="text"/>
                        </div>
                        <div className={classes.form}>
                            <Field component={TextField} label="Cell number( +380 ) "
                                   helperText="Please Enter Your cell number" name="cell" type="text"/>
                        </div>
                        <div className={classes.form}>
                            <Field component={TextField} label="Age"
                                   helperText="Please Enter Your Age" name="age" type="text"/>
                        </div>
                        <div className={classes.buttons_form}>
                            <div className={classes.button_distance_left}>
                                <Button variant="contained" color="primary" type="submit"
                                        className="btn btn-primary mr-2">Create customer</Button>
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

export default AddNewCustomer