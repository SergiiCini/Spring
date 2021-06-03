import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import {openNewAccountActions} from "../../redux/Customer/CustomerActions";
import {useDispatch, useSelector} from "react-redux";
import {modalGetCustomerId} from "../../redux/ToggleModal/modalSelector";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(5, 1, 0, 0),
    },
    heading: {
        margin: theme.spacing(5),
        fontWeight: "bold",
        color: "black",
    }
}));

export default function AccountCurrency() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const id = useSelector(modalGetCustomerId);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel className={classes.heading} component="legend">Choose currency for new account</FormLabel>
                <RadioGroup aria-label="quiz" value={value} name="quiz" onChange={handleRadioChange}>
                    <FormControlLabel value="UAH" control={<Radio />} label="UAH" />
                    <FormControlLabel value="USD" control={<Radio />} label="USD" />
                    <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
                    <FormControlLabel value="CHF" control={<Radio />} label="CHF" />
                    <FormControlLabel value="GBP" control={<Radio />} label="GBP" />
                </RadioGroup>
                <Button type="submit" variant="outlined" color="primary" className={classes.button}
                        onClick={() => {dispatch(openNewAccountActions(id, value));
                                        dispatch(toggleModalAction())}}>
                    Open account
                </Button>
            </FormControl>
        );
}