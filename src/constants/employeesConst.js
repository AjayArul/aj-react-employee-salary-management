export const columns = [
    { id: 'id', label: 'Id', minWidth: 120, sort:true, img:'profile_pic' },
    { id: 'full_name', label: 'Name', minWidth: 170, sort:true,
      format: (value) => value.toLocaleString('en-US')
    },
    { id: 'login_id', label: 'Login', minWidth: 100, sort:true,
      format: (value) => value.toLocaleString('en-US')
    },
    {
      id: 'salary',
      label: 'Salary',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
      sort:true 
    },
    { id: 'action', label: 'Action', minWidth: 170, align: 'right', sort:false }
];