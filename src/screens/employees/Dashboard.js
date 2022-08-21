import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UploadCSV from '../../components/employees/UploadCSV';
import ReuseTable from './../../components/table/ReuseTable';
import { 
  getEmployees, 
  uploadEmployee, 
  updateEmplyee, 
  deleteEmplyee 
} from './../../store/sliceFeatures/employeeSlice'
import PageLayout from './../../layouts/pageLayout/PageLayout';
import { columns } from './../../constants/employeesConst';
import EditDetails from '../../components/employees/EditDetails';
import DeleteDetails from '../../components/employees/DeleteDetails';

const Dashboard = () => {
  const dispatch = useDispatch();
  const empList = useSelector(state=> state.employees.items);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [editData, setEditData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);

  // upload employees details 
  const handleOnSubmit = (files) => {
    const body = {
        file: files
    };
    dispatch(uploadEmployee(body));
  };

  // open employee edit details dialog winndow 
  const openEditPage = (data) => {
    setEditData(data);
    setIsOpenEdit(true);
  };

  // open employee delete waring dialog winndow
  const openDeletePage = (data) => {
    setDeleteData(data);
    setIsOpenDelete(true);
  };

  // Delete employee details 
  const deleteEmployeeApiCall = (id) => {
    dispatch(deleteEmplyee(id));
  }
  
  useEffect(()=> {
    dispatch(getEmployees())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageLayout useRef title="Dashboard">
      <UploadCSV handleOnSubmit={handleOnSubmit}/>
      { empList &&
        <>
          <ReuseTable  listItems={empList} columns={columns} 
            openEditPage={openEditPage} 
            callDeletePage={openDeletePage} 
          />
          <EditDetails isOpen={isOpenEdit} data={editData} 
            handleClose={()=>setIsOpenEdit(false)} 
            onSubmit={(id, data)=> dispatch(updateEmplyee({id, data}))}
          />
          <DeleteDetails isOpen={isOpenDelete} data={deleteData} 
            handleClose={()=>setIsOpenDelete(false)} 
            onSubmit={deleteEmployeeApiCall}
          />
        </>
      }
    </PageLayout>
  )
}

export default Dashboard