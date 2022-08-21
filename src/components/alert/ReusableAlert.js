import React, {memo} from 'react'
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bg: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000',
        zIndex: '10',
        opacity: '0.8',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0
    },
    alert: {
        zIndex: '200',
        position: 'relative'
    }
}));

const ReusableAlert = (props) => {
    const {severity, isOpen, message, alertClose} = props;
    const classes = useStyles();
    return (
        <>
            {severity === 'error' && <span className={classes.bg}></span>}
            <Fade className={classes.alert} in={isOpen}>
                <Alert 
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            data-testid="alertClose"
                            onClick={alertClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    } 
                    variant="filled" 
                    severity={severity}
                > 
                    {message}
                </Alert>
            </Fade>
        </>
       
       
    )
}

export default memo(ReusableAlert)