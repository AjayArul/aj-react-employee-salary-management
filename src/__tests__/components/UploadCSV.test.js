import { render, screen, fireEvent, waitForElementToBeRemoved} from '@testing-library/react';
import UploadCSV from '../../components/employees/UploadCSV';

test('renders correctly', () => {
  render(<UploadCSV/>);
  const uploadButton = screen.getByTestId("uploadButton");
  expect(uploadButton).toBeTruthy();
  
});

test("Drop or Click file to upload", async() => {
  render(<UploadCSV />);
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
});

test("Upload DropzoneDialog close", async() => {
  render(<UploadCSV />);
  const uploadButton = screen.getByTestId("uploadButton");
  fireEvent.click(uploadButton);
  // eslint-disable-next-line testing-library/no-node-access
  const button = screen.getByText(/Cancel/i).parentNode;
  fireEvent.click(button);
  await waitForElementToBeRemoved(()=> screen.queryByText("Cancel"));
});

test("Upload emplyees Successfully", async() => {
  const handleOnSubmit = jest.fn();
  render(<UploadCSV handleOnSubmit={handleOnSubmit}/>);
  const uploadButton = screen.getByTestId("uploadButton");
  fireEvent.click(uploadButton);
  // eslint-disable-next-line testing-library/no-node-access
  const button = screen.getByText(/Submit/i).parentNode;
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
  fireEvent.click(await button);
  expect(handleOnSubmit).toHaveBeenCalledTimes(1);
});





