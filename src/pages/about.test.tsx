import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './about.page';

describe('About page', () => {
  it('renders', () => {
    render(<About />);
  });

  it('renders a link to the GitHub repo', () => {
    render(<About />);
    const ghLink = screen.getByRole('link', { name: 'github' });
    expect(ghLink).toBeInTheDocument();
    expect(ghLink).toHaveAttribute('href', 'https://github.com/jman793/RuntimeEscape');
  });
});
