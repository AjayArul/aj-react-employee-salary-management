import { render, screen } from '@testing-library/react';
import Home from './../../screens/Home';
import NotFound from './../../screens/NotFound';

test('Dashboard renders correctly', () => {
  render(<Home/>);  
  const title = screen.getByText(/Welcome to Salary Manager/i);
  expect(title).toBeInTheDocument();
});

test('NotFound renders correctly', () => {
  render(<NotFound/>);  
  const title = screen.getByText(/Page Not Found/i);
  expect(title).toBeInTheDocument();
});