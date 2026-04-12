import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './404.page';

describe('404 page', () => {
  it('renders the 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });

  it('renders a link back to home', () => {
    render(<NotFound />);
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
