import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const headingElement = screen.getByText(/Heat Resilience Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
