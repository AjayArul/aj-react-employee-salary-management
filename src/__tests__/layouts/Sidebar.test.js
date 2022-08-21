
import { renderWithRedux, render, screen, fireEvent } from '../../utils/test-utils';
import SideBar from '../../layouts/sideBar/Sidebar';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));



test('Side bar', async () => {
    renderWithRedux(<SideBar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('Side bar switchScreenFunc', async () => {
    renderWithRedux(<SideBar />)
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    const switchScreenFunc = screen.getAllByTestId('switchScreenFunc')[1];
    fireEvent.click(switchScreenFunc)
});