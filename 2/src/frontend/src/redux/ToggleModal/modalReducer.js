import * as actions from "../actionTypes"

const initialStore = {
    isModalOpen: false,
    modalOpenType: null,
    customerId: null
}

const modalReducer = (store = initialStore, action) => {
    function destType(){
        const {modalType} = action.payload
        return modalType;
    }
    function destId(){
        const {id} = action.payload
        return id;
    }
    const type = action.payload ? destType() : null;
    const id = action.payload ? destId() : null;
    console.log(type, id)
    switch (action.type){
        case actions.TOGGLE_MODAL:
            return {
                ...store,
                isModalOpen: !store.isModalOpen,
                modalOpenType: type,
                customerId: id
            }
        default:
            return store
    }
}

export default modalReducer;