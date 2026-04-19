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

  it('renders an RSS link pointing to /feed', () => {
    render(<Header />);
    const rssLink = screen.getByRole('link', { name: 'RSS' });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', '/feed');
  });
});
