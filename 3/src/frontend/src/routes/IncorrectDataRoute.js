import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        ...theme.wrapper
    },
    btn: {
        margin: 20
    },
    content: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        alignItems: 'center'
    }
}));
function IncorrectDataRoute(props) {
    const classes = useStyles()
    const { history } = props;

    return (
        <Grid container spacing={2} >
            <Grid container spacing={2} className={classes.wrapper}>
                <Grid item xs={12} className={classes.content}>
                    <Typography variant="h2" >
                        OOOoooppps...
                    </Typography>
                    <Typography variant="h6" >
                        Incorrect accounts data!
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.btn} onClick={history.goBack}>
                        Go back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withRouter(IncorrectDataRoute);
