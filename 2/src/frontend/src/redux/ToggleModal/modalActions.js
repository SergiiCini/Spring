import * as actions from '../actionTypes';

export const toggleModalAction = (modalType, id) => (dispatch) => dispatch ({
    type: actions.TOGGLE_MODAL,
    payload: {modalType, id}
})
