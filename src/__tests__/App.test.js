import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('renders APP checked with redux', () => {
    const initialState = { success: null };
    const mockStore = configureStore();
    let store;

    it('Shows "Welcome to Salary Manager!"', () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText('Welcome to Salary Manager')).not.toBeNull();
    });
});