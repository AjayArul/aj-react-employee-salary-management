export const employeeKeys = {
  ID: 'id',
  NAME: 'full_name',
  LOGIN: 'login_id',
  SALARY: 'salary',
  PROFILE_PIC: 'profile_pic'
}


export const columns = [
    { id: employeeKeys.ID, label: 'Id', minWidth: 120, sort:true }, // img: employeeKeys.PROFILE_PIC
    { id: employeeKeys.NAME, label: 'Name', minWidth: 170, sort:true,
      format: (value) => value.toLocaleString('en-US')
    },
    { id: employeeKeys.LOGIN, label: 'Login', minWidth: 100, sort:true,
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: employeeKeys.SALARY,
      label: 'Salary',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
      sort:true 
    },
    { id: 'action', label: 'Action', minWidth: 170, align: 'right', sort:false }
];