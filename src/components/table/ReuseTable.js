import React, { memo, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './ResueTable.scss';

const ReuseTable = (props) => {
  const {listItems, columns, openEditPage, callDeletePage} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState();
  const [order, setOrder] = React.useState();
  const [rows, setRows] = useState([]);
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');

  const handleChangePage = (event, newPage) => {    
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleFilter = () => {   
    if (!minSalary && !maxSalary) return;
    setPage(0);
    if (minSalary && maxSalary) return setRows(listItems.filter(item => item.salary >= minSalary && item.salary <= maxSalary));
    if (minSalary)  return setRows(listItems.filter(item => item.salary >= minSalary));
    if (maxSalary) return setRows(listItems.filter(item => item.salary <= maxSalary));
  };
  const handleFilterReset = () => { 
    setMinSalary('');
    setMaxSalary('');
    setRows(listItems);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  };
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
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  useEffect(()=>{
    setRows(listItems);
  },[listItems]);
                    
  return (
    <div className="reuseTable">
        <Box className="filterBox">
            <TextField id="min-salary" label="Minimum salary" variant="outlined" type="number"
                value={minSalary || ''} onChange={(e)=>setMinSalary(e.target.value)} />- 
            <TextField id="max-salary" label="Maximum salary" variant="outlined" type="number"
               value={maxSalary || ''} onChange={(e)=>setMaxSalary(e.target.value)} /> 
            <Button data-testid="applyBtn" variant="outlined" color="primary" size="large" onClick={handleFilter} disabled={!minSalary && !maxSalary?true:false} >
                Apply
            </Button>
            <Button data-testid="resetBtn" variant="outlined" color="default" size="large" onClick={handleFilterReset} disabled={!minSalary && !maxSalary?true:false} >
               <RefreshIcon/>
            </Button>
        </Box>
        <Box mt={2}>
            <TableContainer className="tableContainer">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns && columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            sortDirection={orderBy === column.id ? order : false}
                            >
                            {column.sort ?
                                <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={()=>handleRequestSort(column.id)}
                                        >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <span className="visuallyHidden">
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                : column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    {rows && Array.isArray(rows) && rows.length > 0 ?
                      <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                          return (
                            <TableRow hover role="row" tabIndex={-1} key={row.id}>
                              {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                  <TableCell key={column.id} align={column.align} >
                                      {column.img && 
                                        <div className="vericalCenter"> 
                                          <div><img className='thumbnail' alt={value} src={row[column.img]} /></div>
                                          <div>{value}</div>
                                        </div>
                                      }
                                      { !column.img && (column.format && typeof value === 'number' ? column.format(value) : value) }
                                      {column.id === 'action' && 
                                        <>
                                          <IconButton
                                            data-testid="editIconBtn"
                                            aria-label="edit"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                              openEditPage(row)
                                            }}
                                          >
                                            <EditIcon/>
                                          </IconButton>
                                          <IconButton
                                            data-testid="deleteIconBtn"
                                            aria-label="delete"
                                            color="secondary"
                                            size="small"
                                            onClick={() => {
                                              callDeletePage(row)
                                            }}
                                          >
                                            <DeleteIcon/>
                                          </IconButton>
                                        </>
                                      }
                                  </TableCell> 
                                  );
                              })}
                            </TableRow>
                          );
                          })}
                      </TableBody>
                    : <TableBody>
                        <TableRow hover role="row" tabIndex={-1} >
                          <TableCell colSpan={columns.length}>Data not found</TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
            </TableContainer>
            {rows && rows.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
            
        </Box>
            
    </div>
  );
};

export default memo(ReuseTable);