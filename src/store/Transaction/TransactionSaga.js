import { all, delay, put, select, takeEvery, takeLatest} from "@redux-saga/core/effects";
import processAction from "../../utils/ProcessActions";
import { processCustomAction } from "../../utils/ProcessActions";
import * as types from "./TransactionTypes";

import * as services from './TransactionServices'


function* getAllTransactions({ referenceNumber }) {
    let data = { referenceNumber }

    const actions = Object.values(data).map(item => item);

    yield processCustomAction({
        params: [...actions],
        service: services.getAllTransactions,
        success: types.GET_ALL_TRANSACTIONS_SUCCESS,
        failed: types.GET_ALL_TRANSACTIONS_FAILED
    })
}


export default function* watchTransactionRequests() {
    yield all([
        takeEvery(types.GET_ALL_TRANSACTIONS, getAllTransactions),
    ])
}