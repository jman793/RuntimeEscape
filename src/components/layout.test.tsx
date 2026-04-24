import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './layout';

describe('Layout', () => {
  it('renders the Header with navigation links', () => {
    render(<Layout />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders children passed to it', () => {
    render(
      <Layout>
        <p>Test child content</p>
      </Layout>
    );
    expect(screen.getByText('Test child content')).toBeInTheDocument();
  });

  it('renders the Footer with social links', () => {
    render(<Layout />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'X' })).toBeInTheDocument();
  });
});
