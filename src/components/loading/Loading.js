import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000',
        zIndex: '100',
        opacity: '0.8',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0
    }
}));


const Loading = () => {
    const clases = useStyles();
    return (
        <span className={clases.loading}><CircularProgress /></span>
    )
}

export default Loading