import React, { useEffect } from 'react'
import UploadCSV from './../../components/uploadFile/UploadCSV';
import ReuseTable from './../../components/table/ReuseTable';
// import {uploadEmployee} from '../../store/actions/EmployeeAction';
import { getEmployees, uploadEmployee } from '../../store/sliceFeatures/employeeSlice'
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../layouts/pageLayout/PageLayout';
import { columns } from '../../constants/employeesConst';

const Dashboard = () => {
  const dispatch = useDispatch();
  const empList = useSelector(state=> state.employees.items);
  
  // upload employees details 
  const handleOnSubmit = (files) => {
    const body = {
        file: files
    };
    dispatch(uploadEmployee(body));
  };

  useEffect(()=> {
    dispatch(getEmployees())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PageLayout useRef title="Dashboard">
      <UploadCSV handleOnSubmit={handleOnSubmit}/>
      { empList &&
        <ReuseTable  listItems={empList} columns={columns} 
          callEditPage={()=> {return false}} 
          callDeletePage={()=> {return false}} 
        />
      }
    </PageLayout>
  )
}

export default Dashboard