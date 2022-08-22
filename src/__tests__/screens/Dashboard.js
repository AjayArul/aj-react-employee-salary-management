import { wait } from 'moxios';
import { renderWithRedux, fireEvent, screen, waitForElementToBeRemoved, cleanup } from '../../utils/test-utils';
import Dashboard from './../../screens/employees/Dashboard';

afterEach(cleanup);

let originFetch;
beforeEach(() => {
    originFetch = (global).fetch;
});
afterEach(() => {
    (global).fetch = originFetch;
});

describe('renders Dashboard checked with redux', () => {
    it('Shows "Welcome to Salary Manager!"', async () => {
        renderWithRedux(<Dashboard />)
        expect(await screen.findByText('Dashboard')).toBeInTheDocument(); 
    });
});

test("Upload emplyees api call", async () => {
    renderWithRedux(<Dashboard />, {success:null, error:null });
    const uploadButton = screen.getByTestId("uploadButton");
    fireEvent.click(uploadButton);
    // eslint-disable-next-line testing-library/no-node-access
    const inputEl = document.querySelector('[type="file"]');
    const file = new File(["file"], "ping.csv", {
        type: "text/csv",
    });
  
    Object.defineProperty(inputEl, "files", {
        value: [file],
    });
    fireEvent.change( inputEl, "files", {
      value: [file],
    });
    expect(await screen.findByText("ping.csv")).toBeInTheDocument(); 

    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(button);
    await waitForElementToBeRemoved(()=> screen.queryByText("Submit"));
    expect(screen.getByText(/Upload Employee/i)).toBeInTheDocument();
});

describe('Employees List actions', () => {
    it('Edit button click', async ()=>{
        renderWithRedux(<Dashboard />, {
            initialState: { employees: { items: [{"id": "1", }] } }
          });
        const editBtn = screen.getAllByTestId("editIconBtn")[0];
        fireEvent.click(editBtn);
        expect(await screen.findByText(/Edit/i)).toBeInTheDocument();
    })
    it('Edit popup, change text and save.', async ()=>{
        renderWithRedux(<Dashboard />, {
            initialState: { employees: { items: [{"id": "1", "full_name" : "test before" }] } }
          });
        fireEvent.click(screen.getAllByTestId("editIconBtn")[0]);
        expect(await screen.findByText(/test before/i)).toBeInTheDocument();
        
        const salary = document.querySelector('#name');
        fireEvent.change(salary, {"target": {"value": "12345"}});
        expect(salary).toHaveProperty("value", "12345");

        const editSaveBtn = screen.getByTestId("editSaveBtn");
        fireEvent.click(editSaveBtn);
        await waitForElementToBeRemoved(()=> screen.queryByText(/Save/i));
    })
    it('Edit popup, Cancel button action.', async ()=>{
        renderWithRedux(<Dashboard />, {
            initialState: { employees: { items: [{"id": "1", "full_name" : "test before" }] } }
          });
        const editBtn = screen.getAllByTestId("editIconBtn")[0];
        fireEvent.click(editBtn);
        expect(await screen.findByText(/test before/i)).toBeInTheDocument();
        const editCancelBtn = screen.getByTestId("editCancelBtn");
        fireEvent.click(editCancelBtn);
        await waitForElementToBeRemoved(()=> screen.queryByText("Cancel"));
    })
    it('Delete button click', async ()=>{
        renderWithRedux(<Dashboard />, {
            initialState: { employees: { items: [{"id": "1", }] } }
          });
        const deleteBtn = screen.getAllByTestId("deleteIconBtn")[0];
        fireEvent.click(deleteBtn);
        expect(await screen.findByText(/Are you sure to delete this employee record?/i)).toBeInTheDocument();
    })
    it('Delete popup, confirm worning dialog.', async ()=>{
        renderWithRedux(<Dashboard />, {
            initialState: { employees: { items: [{"id": "1", }] } }
          });
        const deleteBtn = screen.getAllByTestId("deleteIconBtn")[0];
        fireEvent.click(deleteBtn);
        const yesBtn = screen.getByTestId("yesBtn");
        fireEvent.click(yesBtn);
        await waitForElementToBeRemoved(()=> screen.queryByText("Yes"));
    })
});