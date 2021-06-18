import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const SuccessData = () => {

    const useStyles = makeStyles({
        root: {
            minWidth: 50,
            minHeight: 40,
        },
    });

    const classes = useStyles();

    return (
        <h3 className={classes.root} align="center">{"Success!"}</h3>
    )
}

export default SuccessData