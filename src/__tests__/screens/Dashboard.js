import { renderWithRedux, fireEvent, screen, waitForElementToBeRemoved } from '../../utils/test-utils';
import Dashboard from './../../screens/employees/Dashboard';

let originFetch;
beforeEach(() => {
    originFetch = (global).fetch;
});
afterEach(() => {
    (global).fetch = originFetch;
});

describe('renders Dashboard checked with redux', () => {
    it('Shows "Welcome to Salary Manager!"', () => {
        const {getByText} = renderWithRedux(<Dashboard />)
        
        expect(getByText('Dashboard')).not.toBeNull();
    });
});

test("Upload emplyees api call", async() => {
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
    fireEvent.change(inputEl, "files", {
      value: [file],
    });
    expect(await screen.findByText("ping.csv")).toBeInTheDocument(); 

    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(await button);
    await waitForElementToBeRemoved(()=> screen.queryByText("Submit"));
    expect(screen.getByText(/Upload Employees/i)).toBeInTheDocument();
});