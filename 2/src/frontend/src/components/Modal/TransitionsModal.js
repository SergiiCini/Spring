import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import Slide from '@material-ui/core/Slide';
import {useDispatch, useSelector} from "react-redux";
import {modalTypeSelector, openModalSelector} from "../../redux/ToggleModal/modalSelector";
import {toggleModalAction} from "../../redux/ToggleModal/modalActions";
import AddNewCustomer from "../AddNewCustomer/AddNewCustomer";
import ModifyCustomer from "../ModifyCustomer/ModifyCustomer";
import AccountCurrency from "../AccountCurrency/AccountCurrency";
import Withdraw from "../Withdraw/Withdraw";
import TopUp from "../TopUp/TopUp";
import SendMoney from "../SendMoney/SendMoney";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function TransitionsModal() {
    const isModalOpen = useSelector(openModalSelector);
    const dispatch = useDispatch();
    const modalType = useSelector(modalTypeSelector);

    const renderModal = modalType === "new_customer" ? <AddNewCustomer/> :
        modalType === "modify_customer" ? <ModifyCustomer/> :
            modalType === "new_account" ? <AccountCurrency/> :
                modalType === "withdraw" ? <Withdraw/> :
                    modalType === "top-up" ? <TopUp/> :
                        modalType === "send" ? <SendMoney/> : null;

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
