import axios from "axios";
import api from "../../utils/Api";


export const getAllTransactions = async (referenceNumber) => {
    let url = referenceNumber ? `/transaction/${referenceNumber}` : '/transactions'
    try {

        let res = await api({
            method: 'get',
            url: url
        })

        return res.data
    } catch (e) {
        throw e
    }
}