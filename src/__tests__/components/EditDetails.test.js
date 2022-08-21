/* eslint-disable testing-library/no-node-access */
import * as React from "react";
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import EditDetails from './../../components/employees/EditDetails';

afterEach(cleanup);
const props = {
  isOpen:true, 
  handleClose:jest.fn(), 
  onSubmit: jest.fn(),
  data: {
    "id": "e0001",
    "login": "hpotter",
    "name": "Harry Potter",
    "salary": 1234
  }
};

  
test('Employee Edit submit should pass', () => {
   render(<EditDetails {...props} />);
    expect(screen.getByText(/e0001/i)).toBeInTheDocument();

    const salary = document.querySelector('#salary');
    fireEvent.change(salary, {target: {"value": 12345}});
    expect(salary).toHaveProperty("value", "12345");

    const editSaveBtn =  screen.getByTestId("editSaveBtn");
    fireEvent.click(editSaveBtn);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);

});

test('Employee Edit cancel all', () => {
  render(<EditDetails {...props} />);

   const name = document.querySelector('#name');
   fireEvent.change(name, {target: {"value": "Ajay Arul"}});
   expect(name).toHaveProperty("value", "Ajay Arul");

   const login = document.querySelector('#login');
   fireEvent.change(login, {target: {"value": "Aj"}});
   expect(login).toHaveProperty("value", "Aj");

   const salary = document.querySelector('#salary');
   fireEvent.change(salary, {target: {"value": 800000}});
   expect(salary).toHaveProperty("value", "800000");

   const editCancelBtn =  screen.getByTestId("editCancelBtn");
    fireEvent.click(editCancelBtn);
    expect(salary).toHaveProperty("value", "1234");
});
