import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SendIcon from '@material-ui/icons/Send';
import BusinessIcon from '@material-ui/icons/Business';
import {Link, NavLink} from "react-router-dom";
import logo from "../Navigator/bank.png"

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  heading: {
    marginBottom: 0
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    textDecoration: 'none',
    '&:active, &:link, &:visited': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  itemPrimaryHome: {
    textDecoration: 'none',
    '&:visited, &:active, &:focus': {
      color: '#fdfdfd',
      textDecoration: 'none',
    }
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    '&:active, &:visited': {
      color: 'black',
    },
    '&:hover': {
      color: 'blue',
    },
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  const categories = [
    {
      id: 'Main',
      children: [
        { id: <NavLink className={classes.itemPrimary} to="/">Customers</NavLink>, icon: <PeopleIcon />, active: true },
        { id: <NavLink className={classes.itemPrimary} to="/accounts">Accounts</NavLink>, icon: <AccountBalanceWalletIcon /> },
        { id: <NavLink className={classes.itemPrimary} to="/sendmoney">Send money</NavLink>, icon: <SendIcon /> },
        { id: <NavLink className={classes.itemPrimary} to="/employers">Employers</NavLink>, icon: <BusinessIcon /> },
      ],
    },
  ];


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <img className={classes.logo} src={logo}/>
          <h3 className={classes.heading}>ClientBank</h3>
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <Link className={
              classes.itemPrimaryHome} to={`/`}>Home</Link>
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
