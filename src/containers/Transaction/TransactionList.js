import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import viewLogo from '../../assets/icons/viewLogo.svg'
import reverseTransactionLogo from '../../assets/icons/reversalLogo.svg'
import retriggerWebhookLogo from '../../assets/icons/webhookretriggerLogo.svg'
import { getAllTransactions } from '../../store/Transaction/TransactionAction';
import Table from '../BaseTable';
// import Loader from '../Loader/Loader';
import constants, { constantFormat } from '../../utils/Constants';
// import ViewTransactionModal from './components/ViewTransactionModal/ViewTransactionModal';
import AddModal from '../../components/AddModal/AddModal';
// import RetriggerModal from '../../components/RetriggerModal/RetriggerModal';
// import NotificationBar from '../../components/NotificationBar/NotificationBar';


const columns = [
    {
        id: 'merchantReferenceNumber',
        label: 'Merchant Reference No.',
        minWidth: 170,
    },
    {
        id: 'createdDateAndTime',
        label: 'Date & Time',
        minWidth: 170,
        format: (value) => moment(value).format('MM-DD-YYYY | hh:mm:ss A'),
    },
    {
        id: 'totalAmount',
        label: 'Transaction Amount',
        minWidth: 170,
        format: (value) => <NumericFormat value={parseFloat(value).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'\u20B1 '} />,
    },
    {
        id: 'transactionStatus',
        label: 'Transaction Status',
        minWidth: 170,
    }
];


const TransactionList = (props) => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transaction.data);
    const error = useSelector(state => state.transaction.error);
    const isLoading = useSelector(state => state.transaction.isLoading);
    const [referenceNum, setReferenceNum] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);


    const handleRow = (row) => {
        setSelectedRow(row)
        console.log(row)
    };

    const handleSearch = (referenceNum) => {
        dispatch(getAllTransactions(referenceNum))
    }

    const handleAdd = () => {
        setAddModalOpen(true)
    }

    const handleCancel = () => {
        setAddModalOpen(false)
    }

    const handleSubmit = (newTransaction) => {
        console.log(newTransaction)
        setAddModalOpen(false)
    }

    useEffect(() => {
        dispatch(getAllTransactions(''))
    }, [])

    return (
        transactions ?
            <div>
                <Table
                    tableData={transactions}
                    defaultOrderBy='createdDateAndTime'
                    title={constants.transactionList_title}
                    columns={columns}
                    handleRow={handleRow}
                    searchInput={referenceNum}
                    setSearchInput={setReferenceNum}
                    handleSearch={handleSearch}
                    isLoading={isLoading}
                    enableAdd={true}
                    handleAdd={handleAdd}
                    enableEdit={false}
                    placeholder={constants.transactionList_search_placeholder}
                />
                {/* <ViewTransactionModal 
                    open={viewModalOpen} 
                    handleCancel={handleModalClose} 
                    sideBar={props.sideBar} 
                    row={selectedRow}
                    handleReversalSubmit={handleReversalSubmit}
                    handleRetriggerSubmit={handleRetriggerSubmit}
                />*/
                <AddModal open={addModalOpen} handleCancel={handleCancel} handleSubmit={handleSubmit}/>
                /*<RetriggerModal open={retriggerModalOpen} handleCancel={handleModalClose} handleSubmit={handleRetriggerSubmit}/>
                <NotificationBar open={notificationOpen} setNotificationOpen={setNotificationOpen} success={actionSuccess} message={notificationMessage}/> */}
            </div>
        : <></>
    );
}

export default TransactionList;