import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppRoutes from "../../routes/AppRoutes";
import {useDispatch} from "react-redux";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import {getCustomersAction} from "../../redux/Customer/CustomerActions";

const styles = (theme) => ({
    paper: {
        maxWidth: 1200,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

function Content(props) {
    const {classes, customers, accounts} = props;
    const dispatch = useDispatch();
    const valueRef = useRef();

    function getInputSearchValue(){
        return console.log(valueRef.current.value);
    }

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit"/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                inputRef={valueRef}
                                fullWidth
                                placeholder="Search by ..."
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                                onChange={() => getInputSearchValue()}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.addUser}
                            onClick={() => dispatch(toggleModalAction("new_customer"))}>
                                Add customer
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon className={classes.block} color="inherit" onClick={() => dispatch(getCustomersAction())}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {customers.length <= 0 ?
                <div className={classes.contentWrapper}>
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
