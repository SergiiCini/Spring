import * as actions from '../actionTypes';

export const toggleModalAction = (modalType, customerId, accountId) => (dispatch) => dispatch ({
    type: actions.TOGGLE_MODAL,
    payload: {modalType, customerId, accountId}
})
