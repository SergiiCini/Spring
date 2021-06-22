import * as actions from "../actionTypes"

const initialStore = {
    isModalOpen: false,
    modalOpenType: null,
    customerId: null,
    accountId: null
}

const modalReducer = (store = initialStore, action) => {
    function destType(){
        const {modalType} = action.payload
        return modalType;
    }
    function destCustomerId(){
        const {customerId} = action.payload
        return customerId;
    }
    function destAccountId(){
        const {accountId} = action.payload
        return accountId;
    }
    const type = action.payload ? destType() : null;
    const cId = action.payload ? destCustomerId() : null;
    const aId = action.payload ? destAccountId() : null;
    switch (action.type){
        case actions.TOGGLE_MODAL:
            return {
                ...store,
                isModalOpen: !store.isModalOpen,
                modalOpenType: type,
                customerId: cId,
                accountId: aId
            }
        default:
            return store
    }
}

export default modalReducer;