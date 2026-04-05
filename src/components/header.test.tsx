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

  it('renders an About me link pointing to /about', () => {
    render(<Header />);
    const aboutLink = screen.getByRole('link', { name: 'About me' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
