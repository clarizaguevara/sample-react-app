export default {
    /**
     *  Transaction List constants
     */
    transactionList_title: "Transaction List",
    transactionList_search_placeholder: "Search by Reference No.",
    transactionList_merchant_org: "Merchant Organization",
    transactionList_channel_name: "Channel Name",
    transactionList_merchant_ref_no: "Merchant Reference No.",
    transactionList_bayad_ref_no: "Bayad Reference No.",
    transactionList_acquirer: "Acquirer",
    transactionList_payment_method: "Payment Method",
    transactionList_card_number: "Card Number",
    transactionList_currency: "Currency",
    transactionList_amount: "Transaction Amount",
    transactionList_status: "Transaction Status",
    transactionList_settled: "Transaction Settled",
    transactionList_date: "Transaction Date & Time",
    transactionList_auth_code: "Authorization Code",
    transactionList_webhook_status: "Webhook Status",
    transactionList_payment_summary: "Payment Summary",
    transactionList_customer_info: "Customer Information",
    transactionList_history: "Transaction History",
    transactionList_convenience_fee: "Convenience Fee",
    transactionList_customer_name: "Name",
    transactionList_billing_address: "Billing Address",
    transactionList_add_new: "Add New",
    transactionList_submit: "Submit",

    add_modal_description: "Please fill in the details",
    
    /**
     *  Transaction status constants
     */
    status_success: "SUCCESS",
    status_failed: "FAILED",
    status_expired: "EXPIRED",
    status_cancelled: "CANCELLED",
    status_refunded: "REFUNDED",
    status_voided: "VOIDED",
    /**
     *  Reversal modal constants
     */
    reversal_header: "Are you sure?",
    reversal_body1: "Do you really want to reverse this transaction? This process cannot be undone.",
    reversal_body2: "Help us understand the reason.",
    reversal_placeholder: "Enter reason for reversing transaction",
    reversal_button_reverse: "Reverse",
    reversal_button_cancel: "Cancel",
    reversal_notification_success: "(#count) Reverse Transaction request added",

    /**
    *  Delete modal constants
    */
    delete_header: "Are you sure?",
    delete_body: "Do you really want to delete this request? This process cannot be undone",
    delete_button: "Delete",
    delete_button_cancel: "Cancel",
    delete_notification_success: "Request has been deleted",
}

export const constantFormat = (data, message) => {
    var msg = message
    Object.keys(data).map(key => {
        msg = msg.replace('#' + key, data[key])
    })
    return msg;
}