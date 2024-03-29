import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCustomerActions,
    findByNameActions, getCustomersAction,
    getCustomersPaginationActions
} from "../../redux/Customer/CustomerActions";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import {TextField, Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
    customersNumberSelector,
    filteredCustomersSelector
} from "../../redux/Customer/CustomerSelectors";
import Typography from "@material-ui/core/Typography";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'cell', numeric: false, disablePadding: false, label: 'Cell number'},
    {id: 'age', numeric: false, disablePadding: false, label: 'Age'},
    {id: 'employer', numeric: false, disablePadding: false, label: 'Employer'},
    {id: 'accounts', numeric: false, disablePadding: false, label: 'Accounts'},
    {id: 'newAccount', numeric: false, disablePadding: false, label: 'Open account'},
    {id: 'newEmployer', numeric: false, disablePadding: false, label: 'Add employer'},
    {id: 'settings', numeric: false, disablePadding: false, label: 'Modify customer'},
    {id: 'delete', numeric: false, disablePadding: false, label: 'Delete customer'},
];

function EnhancedTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        className={classes.tableHead}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,

    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        textDecoration: 'none',
        '&:active, &:link, &:visited': {
            color: 'black',
        },
        '&:hover': {
            color: 'blue',
        },
    },
    tableHead: {
        textAlign: "center",
        fontWeight: "bold",
    },
    icon: {
        maxWidth: 50
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
        display: 'block',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    mainTable: {
        minWidth: 950
    }
}));

export default function CustomersTable(text, reviver) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    const valueRef = useRef();
    const customers = useSelector(filteredCustomersSelector);
    const customersAmount = useSelector(customersNumberSelector);
    const rows = [];


    useEffect(() => {
        dispatch(getCustomersAction(page, rowsPerPage));
        }, [page, rowsPerPage])

    function getRowsPerPageArray(){
        let rowsArray = [];
        for(let i = 1; i <= customersAmount; i++){
            if(i % 10 === 0){
                rowsArray.push(i)
            }
        }
        if(!rowsArray.includes(customersAmount)) {
            rowsArray.push(customersAmount)
        }
        return rowsArray;
    }

    function getInputSearchValue() {
        return valueRef.current.value;
    }

    function getUserAccounts(id) {
        return customers.filter(c => c.id === id)[0].accounts
    }

    function createData(id, name, email, cell, age, employer, accounts) {
        return {id, name, email, cell, age, employer, accounts};
    }

    customers.map(c => {
        return rows.push(createData(
            c.id, c.name, c.email, c.cell, c.age,
            <NavLink key={c.id + c.name} className={classes.title} to={`/employers/${c.id}`}
                     refresh="true">View</NavLink>,
            <NavLink key={c.id + c.name + c.age} className={classes.title} to={`/accounts/${c.id}`}
                     refresh="true">{getUserAccounts(c.id).length}</NavLink>
        ))
    })

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        console.log("New page: " + newPage)
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    return (
        <div className={classes.root}>
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
                                placeholder="Search customer by name or email"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                                onChange={() => dispatch(findByNameActions(getInputSearchValue()))}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.addUser}
                                    onClick={() => dispatch(toggleModalAction("new_customer"))}>
                                Add customer
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon className={classes.block} color="inherit"
                                                 onClick={() => dispatch(getCustomersAction(page, rowsPerPage))}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {customers.length <= 0 ?
                <div className={classes.contentWrapper}>
                    <Typography color="textSecondary" align="center">
                        No customers found!
                    </Typography>
                </div> :
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                className={classes.mainTable}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.name + row.email + row.cell}
                                            >
                                                <TableCell padding="checkbox">
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.cell}</TableCell>
                                                <TableCell align="center">{row.age}</TableCell>
                                                <TableCell align="center">{row.employer}</TableCell>
                                                <TableCell align="center">
                                                    {row.accounts}
                                                </TableCell>
                                                <TableCell className={classes.icon} align="center">
                                                    <LibraryAddIcon cursor="pointer"
                                                                    onClick={() => dispatch(toggleModalAction("new_account", row.id))}/>
                                                </TableCell>
                                                <TableCell className={classes.icon} align="center">
                                                    <BusinessCenterIcon cursor="pointer"
                                                                        onClick={() => dispatch(toggleModalAction("new_employer", row.id))}/>
                                                </TableCell>
                                                <TableCell className={classes.icon} align="center">
                                                    <SettingsIcon cursor="pointer"
                                                                  onClick={() => dispatch(toggleModalAction("modify_customer", row.id))}/>
                                                </TableCell>
                                                <TableCell className={classes.icon} align="center">
                                                    <IconButton aria-label="delete">
                                                        <DeleteIcon onClick={() =>
                                                            dispatch(deleteCustomerActions(row.id))
                                                        }/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={getRowsPerPageArray()}
                        component="div"
                        count={customersAmount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>}
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    );
}


