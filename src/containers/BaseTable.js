import { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, IconButton, Menu, MenuItem, 
    TextField, LinearProgress } from '@mui/material';
import { Typography, Grid, Paper, Box, Button, InputAdornment } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { visuallyHidden } from '@mui/utils';
import { LocalizationProvider, DesktopDatePicker  } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import PropTypes from 'prop-types';
import filterLogo from '../assets/icons/filterLogo.svg'
import exportLogo from '../assets/icons/exportLogo.svg'
import searchLogo from '../assets/icons/searchLogo.svg'
import calendar from '../assets/icons/Calendar.svg'
import reset from '../assets/icons/reset.svg'
import notFoundLogo from '../assets/notFound.png'
import constants from '../utils/Constants'

const useStyles = makeStyles((theme) => ({
    exportColumn: {
        position: 'sticky',
        right: 0,
    },
    paper: {
        width: '100%',
        overflow: 'hidden',
        border: '1px solid #f3f6f4',
        borderRadius: '16px',
        boxShadow: '0px 12px 40px #f3f6f4',
    },
    resetContainer: {
        marginLeft: 1,
    },
    resetText: {
        color: '#0CA1CB',
        font: 'normal normal 100 14px/18px Public Sans', 
        textAlign: 'right',
        marginLeft: 5,
    },
    rowStatusApproved: {
        backgroundColor: "#dbf3eb",
        color: '#318e79',
        borderRadius: '6px',
        textAlign: 'center',
        alignItems: 'center',
        width: '80px',
        height: '24px',
        font: 'normal normal 600 14px/18px Public Sans', 
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    rowStatusPending: {
        backgroundColor: "#fcf3d4",
        color: '#c38526',
        borderRadius: '6px',
        textAlign: 'center',
        alignItems: 'center',
        width: '80px',
        height: '24px',
        font: 'normal normal 600 14px/18px Public Sans', 
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    rowStatusRejected: {
        backgroundColor: "#fbe5de",
        color: '#c13a35',
        borderRadius: '6px',
        textAlign: 'center',
        alignItems: 'center',
        width: '80px',
        height: '24px',
        font: 'normal normal 600 14px/18px Public Sans', 
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    tableHeader: {
        margin: 20,
        alignItems: 'center',
    },
    tableHeaderText: {
        verticalAlign: "middle",
        marginTop: 20,
        marginBottom: 'auto',
        marginLeft: 0,
        marginRight: "auto",
    },
    tableTitle: {
        color: '#212B36', 
        font: 'normal normal 600 18px/22px Public Sans', 
        textAlign: 'left'
    },
    tableHeaderFields: {
        verticalAlign: "middle",
        marginTop: 15,
        marginBottom: 'auto',
        marginLeft: 0,
        marginRight: 10,
    },
    tableHeaderButton: {
        color: '#5B6269', 
        font: 'normal normal 600 14px/18px Public Sans', 
        textTransform: 'none',
        '&:hover': {
            color: '#0076C0',
            backgroundColor: "#f2f8fb",
            '& #buttonLogo': {
                filter: 'invert(46%) sepia(100%) saturate(2575%) hue-rotate(175deg) brightness(75%) contrast(100%)',
            },
        },
    },
    buttonLogo: {
        marginRight: 10,
    },
    searchFieldContainer: {
        verticalAlign: "middle",
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 20,
        marginRight: 50,
    },
    searchField: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px !important',
        }
    },
    searchFieldStartDateContainer: {
        verticalAlign: "middle",
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 5,
        marginRight: 5,
    },
    searchFieldEndDateContainer: {
        verticalAlign: "middle",
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 5,
        marginRight: 50,
    },

    table: {
        minWidth: "max-content",
    },

    tableContainer: {
        height: 580,
        overflowX: 'auto',
        "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#E6E6E6"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BFBDBD",
            borderRadius: 2
        }
    },
    tablePagination: {
        '& .MuiTablePagination-selectLabel': {
            color: '#7D7D7D',
            font: 'normal normal normal 14px/18px Public Sans',
        },
        '& .MuiTablePagination-selectRoot': {
            backgroundColor: '#FFFFFF',
            color: '#7D7D7D',
            font: 'normal normal normal 14px/18px Public Sans',
        },
        '& .MuiTablePagination-select': {
            backgroundColor: '#FFFFFF',
            color: '#7D7D7D',
            font: 'normal normal normal 14px/18px Public Sans',
        },
        '& .MuiTablePagination-displayedRows': {
            color: '#7D7D7D',
            font: 'normal normal normal 14px/18px Public Sans',
        },
    },
    showMoreColumn: {
        position: 'sticky',
        right: 0,
        background: 'white',
    },
    showMorePopover: {
        marginLeft: 7,
        '& .MuiMenu-paper': {
            border: '1px solid #f3f6f4',
            borderRadius: '15px',
            boxShadow: '2px 2px 2px #f3f6f4',
        },
        '& .MuiMenuItem-root': {
            color: '#4F5B67',
            fontSize: 12,
            '&:hover': {
                color: '#0076C0',
                backgroundColor: "#f2f8fb",
                '& #menuItemLogo': {
                    filter: 'invert(46%) sepia(100%) saturate(2575%) hue-rotate(175deg) brightness(75%) contrast(100%)',
                },
            },
        },
        '& .MuiList-root': {
            padding: 0,
        },
    },
    menuItemLogo: {
        width: 17, 
        height: 'auto',
        verticalAlign: 'middle',
        marginRight: 10,
    },
    menuItemText: {
        marginTop: 8,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        font: 'normal normal normal 14px/18px Public Sans',
    },
    hover: {
        '&:hover': {
            backgroundColor: "#f2f8fb !important",
            '& #showMoreCell': {
                backgroundColor: "#f2f8fb !important",
            },
        },
    },
    notFoundText: {
        marginTop: 10,
        color: '#999999',
        font: 'normal normal bold 14px/18px Public Sans',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F4F6F8',
        color: '#999999',
        font: 'normal normal bold 14px/18px Public Sans',
        borderBottom: '1px solid #f1f1f1',
    },
    [`&.${tableCellClasses.body}`]: {
        font: 'normal normal normal 14px/18px Public Sans',
        borderBottom: '1px solid #f1f1f1',
    },
}));

const NotFoundTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        font: 'normal normal normal 14px/18px Public Sans',
        borderBottom: 0,
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const BaseTable = (props) => {
    const { tableData, defaultOrderBy, columns, handleRow, searchInput, setSearchInput, handleSearch, isLoading, handleAdd } = props;
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [newPage, setNewPage] = useState(0);
    const [rows, setRows] = useState(tableData);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [newRowsPerPage, setNewRowsPerPage] = useState(10);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [hasResult, setHasResult] = useState(true);


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    };

    const handleRequestSort = (event, property) => {
        if (!isLoading) {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        }
    };

    const handleRowClick = (event, row) => {
        if (!isLoading) {
            handleRow(row)
        }
    };

    const handleSearchItem = () => {
        if (searchInput) {
            setNewPage(0)
            handleSearch(searchInput)
        }
    };

    useEffect(() => {
        if (!searchInput) {
            setNewPage(0)
            handleSearch('')
        }
    }, [searchInput])

    useEffect(() => {
        setRows(tableData)
        setPage(newPage)
        setRowsPerPage(newRowsPerPage)
        setHasResult(tableData.length > 0)
    }, [tableData])

    useEffect(() => {
        setRowsPerPage(newRowsPerPage)
        setPage(newPage)
    }, [newRowsPerPage])


    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
    
        return (
            <TableHead>
                <TableRow>
                    {columns.map((headCell) => (
                        <StyledTableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        // numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        // onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        // rowCount: PropTypes.number.isRequired,
    };

    return (
        <Grid>
            <Paper className={classes.paper} elevation={0}>
                <Grid container direction="row" className={classes.tableHeader}>
                    <Grid item className={classes.tableHeaderText}>
                        <Typography className={classes.tableTitle}>
                            {props.title}
                        </Typography>
                    </Grid>
                    {props.enableAdd ?
                        <Grid item className={classes.tableHeaderFields}>
                            <Button className={classes.tableHeaderButton} onClick={handleAdd}>
                                <img id='buttonLogo' src={filterLogo} className={classes.buttonLogo}/>Add
                            </Button>
                        </Grid> : <></>
                    }
                    {props.enableEdit ?
                        <Grid item className={classes.tableHeaderFields}>
                            <Button className={classes.tableHeaderButton}>
                                <img id='buttonLogo' src={exportLogo} className={classes.buttonLogo}/>Edit
                            </Button>
                        </Grid> : <></>
                    }
                    <Grid item lg={2} className={classes.searchFieldContainer}>
                            <TextField 
                                id="outlined-search" 
                                variant="outlined"
                                fullWidth
                                disabled={isLoading}
                                placeholder={props.placeholder}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearchItem()
                                    }
                                }}
                                className={classes.searchField}
                                inputProps={{
                                    maxLength: 50,
                                }}
                                InputProps={{
                                    style : {
                                        font: 'normal normal normal 14px/18px Public Sans',
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="search"
                                                onClick={handleSearchItem}
                                                disabled={isLoading}
                                            >
                                                <img src={searchLogo}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                    </Grid>
                </Grid>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader aria-label="sticky table" className={classes.table}>
                        <EnhancedTableHead
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            // onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {hasResult ? 
                                stableSort(rows, getComparator(order, orderBy))
                                    .map((row) => {
                                        return (
                                            <TableRow hover classes={{hover: classes.hover}} role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <StyledTableCell key={column.id} align={column.align} onClick={(e) => handleRowClick(e, row)}>
                                                            {column.format ? column.format(value) : value}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }
                                )
                                :
                                <>
                                <TableRow>
                                    <NotFoundTableCell colSpan={10}/>
                                </TableRow>
                                <TableRow>
                                    <NotFoundTableCell colSpan={1} rowSpan={10}/>
                                    <NotFoundTableCell align="center" rowSpan={10}>
                                        <Grid container direction='column' justifyContent='center' alignItems='center'>
                                            <Grid item>
                                                <img src={notFoundLogo}/>
                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.notFoundText}>No Result Found</Typography>
                                            </Grid>
                                        </Grid>
                                    </NotFoundTableCell>
                                    <NotFoundTableCell colSpan={5} rowSpan={10}/>
                                </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {isLoading ? <LinearProgress/> : <></>}
                {hasResult ? 
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className={classes.tablePagination}
                    /> : <></> 
                }
            </Paper>
        </Grid>
    );
}

export default BaseTable;