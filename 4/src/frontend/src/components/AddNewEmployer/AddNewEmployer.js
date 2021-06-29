import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {TextField} from 'formik-material-ui';
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {addCustomerEmployerActions} from "../../redux/Employer/EmployerActions";
import {modalGetCustomerId} from "../../redux/ToggleModal/modalSelector";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    form: {
        marginTop: 10,
    },
    field: {
        width: 450
    },
    buttons_form: {
        marginTop: 75,
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

const AddNewEmployer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = useSelector(modalGetCustomerId);


    return (
        <div className='checkout'>
            <h4 align="center">{"Please enter company data below"}</h4>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Company name is required'),
                    address: Yup.string()
                        .required('Company address is required'),
                })}
                onSubmit={(fields) => {
                    dispatch(addCustomerEmployerActions(id, fields));
                    dispatch(toggleModalAction());
                }}
                render={() => (
                    <Form className={classes.root}>
                        <div className={classes.form}>
                            <Field className={classes.field} component={TextField} label="Company Name"
                                   helperText="Please Enter Company Name" name="name"
                                   type="text"/>
                        </div>
                        <div className={classes.form}>
                            <Field className={classes.field} component={TextField} label="Company Address"
                                   helperText="Please Enter Company Address" name="address" type="text"/>
                        </div>
                        <div className={classes.buttons_form}>
                            <div className={classes.button_distance_left}>
                                <Button variant="contained" color="primary" type="submit"
                                        className="btn btn-primary mr-2">Save Employer information</Button>
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

export default AddNewEmployer