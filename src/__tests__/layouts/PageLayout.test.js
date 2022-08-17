import { renderWithRedux } from './../../utils/test-utils';
import PageLayout from './../../layouts/pageLayout/PageLayout';

describe('renders "Page Layout" with redux', () => {
    it('Check the props title!"', () => {
        const { getByText } = renderWithRedux(<PageLayout title='Employees' />)
        
        expect(getByText('Employees')).not.toBeNull();
    });
});