import * as actions from '../actionTypes'

const initialStore = {
    employers: [],
    customerEmployers: []
}

const employerReducer = (store = initialStore, action) => {
    switch (action.type) {
        case actions.GET_EMPLOYERS:
            return {
                ...store,
                employers: action.payload
            }
        case actions.ADD_NEW_EMPLOYER:
            return {
                ...store,
                customerEmployers: action.payload
            }
        case actions.DELETE_EMPLOYER_BY_ID:
            return {
                ...store,
                employers: action.payload
            }
        default:
            return store
    }
}

export default employerReducer