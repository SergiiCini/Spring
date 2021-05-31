import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {modalGetCustomerId, modalTypeSelector, openModalSelector} from "../../redux/ToggleModal/modalSelector";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import AddNewCustomer from "../AddNewCustomer/AddNewCustomer";
import ModifyCustomer from "../ModifyCustomer/ModifyCustomer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function TransitionsModal() {
    const isModalOpen = useSelector(openModalSelector);
    const dispatch = useDispatch();
    const modalType = useSelector(modalTypeSelector);

    const renderModal = modalType === "new" ? <AddNewCustomer/> : modalType === "change" ? <ModifyCustomer/> : null;

    const handleClose = () => {
        dispatch(toggleModalAction())
    };

    return (
        <div>
            <Dialog
                open={isModalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    {renderModal}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransitionsModal
