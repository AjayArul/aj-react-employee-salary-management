import { fireEvent, renderWithRedux, screen, waitFor } from './../../utils/test-utils';
import PageLayout from './../../layouts/pageLayout/PageLayout';

describe('renders "Page Layout" with redux', () => {
    it('Check the props title!"', async() => {
        renderWithRedux(<PageLayout title='Employees' />, {
            initialState: { employees: {success: "test done!"} }
        })

        expect(screen.getByText('Employees')).not.toBeNull();
    });

    it('alert success close', ()=>{
        renderWithRedux(<PageLayout title='Employees' />, {
            initialState: { employees: {success: "test done!"} }
        });
        const alertClose = screen.getByTestId('alertClose');
        fireEvent.click(alertClose);
    })
    it('alert error close', ()=>{
        renderWithRedux(<PageLayout title='Employees' />, {
            initialState: { employees: {error: {response: "test done!" } } }
        });
        const alertClose = screen.getByTestId('alertClose');
        fireEvent.click(alertClose);
    })
});