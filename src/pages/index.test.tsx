import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './index.page';
import { BlogPost } from '../model/post';

const mockPosts: BlogPost[] = [
  {
    content: '',
    title: 'First Post',
    description: 'Description of first post',
    slug: 'first-post',
    date: '2024-01-01',
  },
  {
    content: '',
    title: 'Second Post',
    description: 'Description of second post',
    slug: 'second-post',
    date: '2024-02-01',
  },
];

describe('Home page', () => {
  it('renders the welcome text', () => {
    render(<Home postPreviews={[]} />);
    expect(screen.getByText(/Hello, I am Jonah/)).toBeInTheDocument();
    expect(screen.getByText(/RuntimeEscape/)).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    render(<Home postPreviews={[]} />);
    const ghLink = screen.getByRole('link', { name: 'github' });
    expect(ghLink).toHaveAttribute('href', 'https://github.com/jman793/RuntimeEscape');
  });

  it('renders post cards with title, date, and description', () => {
    render(<Home postPreviews={mockPosts} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText(/Description of first post/)).toBeInTheDocument();

    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('2024-02-01')).toBeInTheDocument();
    expect(screen.getByText(/Description of second post/)).toBeInTheDocument();
  });

  it('renders post cards as links to their slug', () => {
    render(<Home postPreviews={mockPosts} />);
    const firstLink = screen.getByRole('link', { name: /First Post/ });
    expect(firstLink).toHaveAttribute('href', 'first-post');

    const secondLink = screen.getByRole('link', { name: /Second Post/ });
    expect(secondLink).toHaveAttribute('href', 'second-post');
  });

  it('renders no post cards when postPreviews is empty', () => {
    const { container } = render(<Home postPreviews={[]} />);
    expect(container.querySelectorAll('.bg-blue-500')).toHaveLength(0);
  });
});
