import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ReusableAlert from '../../components/alert/ReusableAlert';
import { clearStatus } from './../../store/sliceFeatures/employeeSlice'
import { screenRoutes } from './../../constants/routesPath'

const PageLayout = (props) => {
    const {children, title } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(state => state.employees.success);
    const errors = useSelector(state => state.employees.error);
    const loading = useSelector(state => state.employees.loading);

    const [alertReady, setAlertReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if (success) {
            setAlertReady(true);
            setTimeout(() => {
                setAlertReady(false);
                dispatch(clearStatus('success'));
            }, 5000);
        }
        loading ? setIsLoading(true) 
        : setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, loading])

  return (
    <>
        { isLoading && <Loading /> }
        {success && <ReusableAlert severity='success' isOpen={alertReady} message={success} 
            alertClose={()=>{setAlertReady(false); dispatch(clearStatus('success'));}}/> }
        {  errors?.response && <ReusableAlert severity='error' isOpen={true} message={errors?.response} 
            alertClose={()=>{navigate(screenRoutes.HOME); dispatch(clearStatus(''));}}/>}    
        <h1 className='title'>{title}</h1> 
        {children}  
    </>
  )
}

export default memo(PageLayout)