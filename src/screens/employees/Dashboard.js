import React from 'react'
import UploadCSV from './../../components/uploadFile/UploadCSV';
import {uploadEmployee} from '../../store/actions/employeeAction';
import { useDispatch } from 'react-redux';
import PageLayout from '../../layouts/pageLayout/PageLayout'

const Dashboard = () => {
  const dispatch = useDispatch();

  // upload employees details 
  const handleOnSubmit = (files) => {
    const body = {
        file: files
    };

    dispatch(uploadEmployee(body));
  };

  return (
    <PageLayout useRef title="Dashboard">
      <UploadCSV handleOnSubmit={handleOnSubmit}/>
    </PageLayout>
  )
}

export default Dashboard