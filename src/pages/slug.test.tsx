import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-mdx-remote', () => ({
  MDXRemote: ({ compiledSource }: { compiledSource: string }) => (
    <div data-testid="mdx-content">{compiledSource}</div>
  ),
}));

import PostPage from './[slug].page';

const mockSource = {
  compiledSource: 'Rendered MDX content',
  scope: {},
  frontmatter: {
    title: 'My Test Post',
    description: 'A test description',
    date: '2024-01-01',
  },
};

describe('PostPage', () => {
  it('renders the post title', () => {
    render(<PostPage source={mockSource as any} />);
    expect(screen.getByText('My Test Post')).toBeInTheDocument();
  });

  it('renders the MDX content area', () => {
    render(<PostPage source={mockSource as any} />);
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
    expect(screen.getByText('Rendered MDX content')).toBeInTheDocument();
  });
});
