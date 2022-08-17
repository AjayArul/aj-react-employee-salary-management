import { render } from '@testing-library/react';
import ReusableAlert from './../../components/alert/ReusableAlert';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('renders "Alert" with redux', () => {
    const initialState = { success: null };
    const mockStore = configureStore();
    let store;

    it('Check the severity SUCCESS props!"', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ReusableAlert severity='success' isOpen={true} message='create successfully!' alertClose={jest.fn()} />
                </BrowserRouter>
            </Provider>);

        expect(getByText('create successfully!')).not.toBeNull();
        
    });

    it('Check the severity ERROR props!"', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ReusableAlert severity='error' isOpen={true} message='failed try again!' alertClose={jest.fn()} />
                </BrowserRouter>
            </Provider>);

        expect(getByText('failed try again!')).not.toBeNull();
        
    });
});