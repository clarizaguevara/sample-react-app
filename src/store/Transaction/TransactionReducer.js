import * as types from './TransactionTypes';

const INITIAL_STATE = {
    data: null,
    error: {
        flag: false,
        msg: null,
        status: null
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_ALL_TRANSACTIONS:
            return {
                ...state,
                isLoading: true,
                // data: null,
                error: {
                    flag: false,
                    msg: null,
                    status: null
                }
            }
        case types.GET_ALL_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case types.GET_ALL_TRANSACTIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: {
                    flag: true,
                    msg: action.error,
                    status: action.error.response.status,
                    code: action.error.response.data.code
                }
            }
        default:
            return state;
    }
}