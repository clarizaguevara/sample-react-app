import { all } from 'redux-saga/effects'
import watchTransactionRequests from './Transaction/TransactionSaga'

export default function* rootSaga() {
    yield all([
        watchTransactionRequests(),
    ])
}