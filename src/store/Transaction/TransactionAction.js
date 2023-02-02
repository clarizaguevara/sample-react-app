import { useSelector } from "react-redux";
import * as types from './TransactionTypes';



export const getAllTransactions = (referenceNumber) => {
    return {
        type: types.GET_ALL_TRANSACTIONS,
        referenceNumber,
    };
}