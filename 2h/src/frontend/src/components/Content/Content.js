import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import AppRoutes from "../../routes/AppRoutes";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {getCustomersAction} from "../../redux/Customer/CustomerActions";
import {useDispatch} from "react-redux";
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const styles = (theme) => ({
    paper: {
        maxWidth: 1200,
        margin: 'auto',
        overflow: 'hidden',
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
        display: 'block',
    },
    addButtonWrapper: {
        marginLeft: 1000,
    },
});

function Content(props) {
    const {classes, customers, accounts} = props;
    const dispatch = useDispatch();

    return (
        <Paper className={classes.paper}>
            {customers.length <= 0 ?
                <div className={classes.contentWrapper}>
                    <Grid item className={classes.addButtonWrapper}>
                        <Button variant="contained" color="primary" className={classes.addUser}
                                onClick={() => dispatch(toggleModalAction("new_customer"))}>
                            Add customer
                        </Button>
                    </Grid>
                    <Typography color="textSecondary" align="center">
                        No data for this project yet
                    </Typography>
                </div> :
                <AppRoutes customers={customers} accounts={accounts}/>}
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
