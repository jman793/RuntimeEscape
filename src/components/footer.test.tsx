import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './footer';

describe('Footer', () => {
  it('renders a GitHub link pointing to the correct profile', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jman793');
  });

  it('renders an X link pointing to the correct profile', () => {
    render(<Footer />);
    const xLink = screen.getByRole('link', { name: 'X' });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/RuntimeEscape');
  });

  it('opens social links in a new tab with safe rel attributes', () => {
    render(<Footer />);
    for (const name of ['GitHub', 'X']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
