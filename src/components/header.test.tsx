import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './header';

describe('Header', () => {
  it('renders a Home link pointing to /', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
