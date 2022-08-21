/* eslint-disable testing-library/no-node-access */
import * as React from "react";
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ReuseTable from './../../components/table/ReuseTable';

afterEach(cleanup);
const props = {
    listItems:[
        {id: 1, full_name: 'Corrianne Graffham', login_id: 'cgraffham0', salary: 8214.74, profile_pic: 'http://dummyimage.com/156x100.png/cc0000/ffffff'},
        {id: 2, full_name: 'Randolf Kaesmakers', login_id: 'rkaesmakers1', salary: 9189.6, profile_pic: 'http://dummyimage.com/108x100.png/ff4444/ffffff'},
        {id: 3, full_name: 'Nobe Todarini', login_id: 'ntodarini2', salary: 9217.6, profile_pic: 'http://dummyimage.com/216x100.png/5fa2dd/ffffff'},
        {id: 4, full_name: 'Myca Gromley', login_id: 'mgromley3', salary: 8379.2, profile_pic: 'http://dummyimage.com/222x100.png/dddddd/000000'},
        {id: 5, full_name: 'Gusella Francescotti', login_id: 'gfrancescotti4', salary: 9033.58, profile_pic: 'http://dummyimage.com/125x100.png/dddddd/000000'},
        {id: 6, full_name: 'Reese Potter', login_id: 'rpotter5', salary: 9135.62, profile_pic: 'http://dummyimage.com/116x100.png/ff4444/ffffff'},
        {id: 7, full_name: 'Zachary Meakes', login_id: 'zmeakes6', salary: 8226, profile_pic: 'http://dummyimage.com/216x100.png/5fa2dd/ffffff'},
        {id: 8, full_name: "Cozmo O'Spillane", login_id: 'cospillane7', salary: 9448.51, profile_pic: 'http://dummyimage.com/227x100.png/5fa2dd/ffffff'},
        {id: 9, full_name: 'Mel Martine', login_id: 'mmartine8', salary: 8326.02, profile_pic: 'http://dummyimage.com/240x100.png/cc0000/ffffff'},
        {id: 10, full_name: 'Cathi Gellan', login_id: 'cgellan9', salary: 8257.66, profile_pic: 'http://dummyimage.com/179x100.png/5fa2dd/ffffff'},
        {id: 11, full_name: 'Mariele Fusedale', login_id: 'mfusedalea', salary: 8857, profile_pic: 'http://dummyimage.com/227x100.png/dddddd/000000'},
        {id: 12, full_name: 'Sayer Aronin', login_id: 'saroninb', salary: 9401.94, profile_pic: 'http://dummyimage.com/224x100.png/ff4444/ffffff'}
    ],
    columns: [
        { id: 'id', label: 'Id', minWidth: 80, sort:true, img: 'profile_pic'},
        { id: 'full_name', label: 'Name', minWidth: 170, sort:true },
        { id: 'login_id', label: 'Login', minWidth: 100, sort:true },
        {
            id: 'salary',
            label: 'Salary',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
            sort:true 
        },
        { id: 'action', label: 'Action', minWidth: 170, align: 'right', sort:false }
    ],
    openEditPage: jest.fn(),
    callDeletePage: jest.fn()
};
  
test('EmployeesList should pass', async () => {
   render(<ReuseTable {...props} />);
    expect(screen.getByText(/cgraffham0/i)).toBeInTheDocument();
});

test('EmployeesList - filter with Minimum and Maximum Sarary range', async () => {
    render(<ReuseTable {...props} />);
    const applyBtn = screen.getByTestId('applyBtn');
    const minSalary = document.querySelector('#min-salary');
    const maxSalary = document.querySelector('#max-salary');
    fireEvent.change(minSalary, {target: {value: 8200}});
    fireEvent.change(maxSalary, {target: {value: 8300}});
    expect(minSalary).toHaveProperty("value", "8200");
    expect(maxSalary).toHaveProperty("value", "8300");
    fireEvent.click(await applyBtn);
    expect(screen.getByText(/cgraffham0/i)).toBeInTheDocument();
});

test('EmployeesList - filter with Minimum Sarary range', async () => {
    render(<ReuseTable {...props} />);
    const applyBtn = screen.getByTestId('applyBtn');
    const minSalary = document.querySelector('#min-salary');
    fireEvent.change(minSalary, {target: {value: 100}});
    expect(minSalary).toHaveProperty("value", "100");
    fireEvent.click(await applyBtn);
    expect(screen.getByText(/cgraffham0/i)).toBeInTheDocument();
});

test('EmployeesList - filter with Maximum Sarary range', async () => {
    render(<ReuseTable {...props} />);
    const applyBtn = screen.getByTestId('applyBtn');
    const maxSalary = document.querySelector('#max-salary');
    fireEvent.change(maxSalary, {target: {value: 9000}});
    expect(maxSalary).toHaveProperty("value", "9000");
    fireEvent.click(await applyBtn);
    expect(screen.getByText(/cgraffham0/i)).toBeInTheDocument();
});

test('EmployeesList - filter data not fonud', async () => {
    render(<ReuseTable {...props} />);
    const applyBtn = screen.getByTestId('applyBtn');
    const maxSalary = document.querySelector('#max-salary');
    fireEvent.change(maxSalary, {target: {value: 4000}});
    expect(maxSalary).toHaveProperty("value", "4000");
    fireEvent.click(await applyBtn);
    expect(screen.getByText(/Data not found/i)).toBeInTheDocument();
});

test('EmployeesList - filter Reset all', async () => {
    render(<ReuseTable {...props} />);
    const resetBtn = screen.getByTestId('resetBtn');
    const minSalary = document.querySelector('#min-salary');
    const maxSalary = document.querySelector('#max-salary');
    fireEvent.change(minSalary, {target: {value: 100}});
    fireEvent.change(maxSalary, {target: {value: 4000}});
    fireEvent.click(await resetBtn);
    expect(screen.getByText(/cgraffham0/i)).toBeInTheDocument();
});

test('EmployeesList sorting function test', async() => {
    const {container} = render(<ReuseTable {...props} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const columns = container.getElementsByClassName('MuiTableSortLabel-root')[0];
    fireEvent.click(columns); 
    expect(await screen.findByText("sorted ascending")).toBeInTheDocument();
    fireEvent.click(await columns); 
    expect(await screen.findByText("sorted descending")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container
    const columns2 = container.getElementsByClassName('MuiTableSortLabel-root')[1];
    fireEvent.click(await columns2); 
    expect(await screen.findByText("sorted ascending")).toBeInTheDocument();

});

test('EmployeesList edit and delete function test', async() => {
  render(<ReuseTable {...props} />);

  const deleteIconBtn =  screen.getAllByTestId("deleteIconBtn")[0];
  fireEvent.click(deleteIconBtn);
  expect(props.callDeletePage).toHaveBeenCalledTimes(1);

  const editIconBtn =  screen.getAllByTestId("editIconBtn")[0];
  fireEvent.click(editIconBtn);
  expect(props.openEditPage).toHaveBeenCalledTimes(1);
});

test('EmployeesList row per page function', async() => {
    render(<ReuseTable {...props} />);
  
    const selectDrop =  screen.getByRole('button', { name: /10/i});
    userEvent.click(selectDrop);
    const dropdownItem = await document.querySelectorAll('[role="option"]')[0];
    userEvent.click(await dropdownItem);
}); 

test('EmployeesList pagination next page button click', async() => {
    render(<ReuseTable {...props} />);
    const selectOption =  screen.getByTitle(/Next page/i);
    fireEvent.click(selectOption);
    expect(screen.getByText(/saroninb/i)).toBeInTheDocument();
});
