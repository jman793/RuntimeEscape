import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './about.page';

describe('About page', () => {
  it('renders the About Me heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });

  it('renders biographical content', () => {
    render(<About />);
    expect(screen.getByText(/Jonah Marz/)).toBeInTheDocument();
    expect(screen.getByText(/University of Missouri/)).toBeInTheDocument();
    expect(screen.getByText(/AWS/)).toBeInTheDocument();
  });

  it('renders a link to the GitHub repo', () => {
    render(<About />);
    const ghLink = screen.getByRole('link', { name: 'github' });
    expect(ghLink).toBeInTheDocument();
    expect(ghLink).toHaveAttribute('href', 'https://github.com/jman793/RuntimeEscape');
  });
});
