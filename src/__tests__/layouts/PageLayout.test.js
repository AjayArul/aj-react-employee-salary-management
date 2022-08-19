import { renderWithRedux, screen } from './../../utils/test-utils';
import PageLayout from './../../layouts/pageLayout/PageLayout';

describe('renders "Page Layout" with redux', () => {
    it('Check the props title!"', () => {
        renderWithRedux(<PageLayout title='Employees' />)
        
        expect(screen.getByText('Employees')).not.toBeNull();
    });
});