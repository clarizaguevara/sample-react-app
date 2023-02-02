import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Typography, 
    withStyles, Grid, } from '@material-ui/core';
import { TextField, }  from '@mui/material';
import constants from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        marginTop: 18,
        paddingLeft: 26,
        paddingRight: 26,
    },
    actionContainer: {
        maxWidth: '50%',
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 'auto',
        marginRight: 22,
    },
    dialogBody: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 26,
        paddingRight: 26,
    },
    dialogText: {
        textAlign: 'left',
        font: 'normal normal normal 14px/22px Public Sans',
        color: '#7B8999',
    },
    titleText: {
        font: 'normal normal bold 18px/18px Public Sans',
        color: '#4F6072',
    },
    paper: {
        borderRadius: 16,
    },
    buttonCancel: {
        font: 'normal normal bold 13px/21px Public Sans',
        color: '#496B81',
        width: '79px',
        height: '36px',
        borderColor: '#e2e2e2',
        borderRadius: '6px',
        textTransform: 'none',
        marginLeft: 5,
        marginRight: 5,
    },
    submitButtonText: {
        color: 'white',
    },
    reasonField: {
        marginLeft: 26,
        marginRight: 26,
    },
    reasonTextArea: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '7px !important',
        },
        '& .MuiInputBase-input': {
            paddingTop: 14,
            paddingBottom: 14,
        },
    },
    root: {
        backgroundColor: "#4F5C66B3"
    }
}));

const AddModal = props => {
    const { open, clickCloseOutside = false, handleCancel, handleSubmit } = props
    const classes = useStyles()
    const [reason, setReason] = useState('')
    const [disableSubmit, setDisableSubmit] = useState(true)
    
    const handleClickOutside = () => {
        if (clickCloseOutside) handleCancel()
    }

    const SubmitButton = withStyles((theme) => ({
        root: {
            backgroundColor: "#0076BF",
            '&:hover': {
                backgroundColor: "#0287d9",
            },
            "&:disabled": {
                backgroundColor: "#969696"
            },
            font: 'normal normal 200 13px/21px Public Sans',
            width: '79px',
            height: '36px',
            borderRadius: '6px',
            textTransform: 'none',
            marginLeft: 5,
            marginRight: 5,
        },
    }))(Button);

    useEffect(() => {
        let onlySpaces = (/^\s*$/).test(reason)
        setDisableSubmit(onlySpaces ? true : false)
    }, [reason])

    useEffect(() => {
        if (!open) {
            setReason('')
            setDisableSubmit(true)
        }
    }, [open])

    return (
        <div>
            <Dialog
                onClose={handleClickOutside}
                open={open}
                scroll={'body'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="xs"
                classes={{
                    paper: classes.paper,
                }}
                BackdropProps={{
                    classes: {
                        root: classes.root
                    }
                }}
            >
                <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
                    <Typography variant='body2' className={classes.titleText}>{constants.transactionList_add_new}</Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogBody}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <Typography variant='body2' className={classes.dialogText}>
                            {constants.add_modal_description}
                        </Typography>
                        {/* <Typography variant='body2' className={classes.dialogText} style={{ marginTop: 15 }}>
                            {constants.reversal_body2}
                        </Typography> */}
                    </DialogContentText>
                </DialogContent>
                <Grid container direction='row'>
                    <Grid item lg={5}>
                        <Typography variant='body2' className={classes.dialogText} style={{ marginLeft: 26, marginTop: 15 }}>
                            {constants.transactionList_merchant_ref_no}
                        </Typography>
                    </Grid>
                    <Grid item lg={7}>
                        <Grid item id='grid-item-reason' className={classes.reasonField}>
                            <TextField
                                id='outlined-basic'
                                variant='outlined'
                                fullWidth
                                // placeholder={constants.reversal_placeholder}
                                // inputProps={{
                                //     maxLength: 200,
                                // }}
                                InputProps={{
                                    style : {
                                        color: '#7B8999',
                                        font: 'normal normal normal 14px/24px Public Sans',
                                        opacity: 1,
                                    }
                                }}
                                onChange={(e) => setReason(e.target.value)}
                                className={classes.reasonTextArea}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <DialogActions id='dialog-actions-reversal' className={classes.actionContainer}>
                    <SubmitButton id='button-submit' disabled={disableSubmit} variant='contained' fullWidth={false} onClick={(e) => handleSubmit(reason)}>
                        <div className={classes.submitButtonText}>{constants.transactionList_submit}</div>
                    </SubmitButton>
                    <Button id='button-cancel' variant='outlined' className={classes.buttonCancel} fullWidth={false} onClick={(e) => handleCancel(constants.menu_reversal)}>
                        {constants.reversal_button_cancel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


export default AddModal;