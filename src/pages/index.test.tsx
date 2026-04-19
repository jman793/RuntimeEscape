import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import Home, { getStaticProps } from './index.page';
import { BlogPost } from '../model/post';

vi.mock('fs', () => {
  const mock = {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  };
  return { ...mock, default: mock };
});

vi.mock('next-mdx-remote/serialize', () => ({
  serialize: vi.fn(),
}));

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
    expect(screen.getByText(/welcome to RuntimeEscape/)).toBeInTheDocument();
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

describe('getStaticProps draft filtering', () => {
  const mockedReaddirSync = vi.mocked(readdirSync);
  const mockedReadFileSync = vi.mocked(readFileSync);
  const mockedSerialize = vi.mocked(serialize);

  beforeEach(() => {
    mockedReaddirSync.mockReset();
    mockedReadFileSync.mockReset();
    mockedSerialize.mockReset();
  });

  it('excludes posts with draft: true', async () => {
    mockedReaddirSync.mockReturnValue(['published.mdx', 'draft.mdx'] as any);
    mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\ncontent');
    mockedSerialize
      .mockResolvedValueOnce({
        frontmatter: { title: 'Published', description: 'desc', date: '2024-01-01' },
      } as any)
      .mockResolvedValueOnce({
        frontmatter: { title: 'Draft', description: 'desc', date: '2024-01-02', draft: true },
      } as any);

    const result = await getStaticProps();
    expect(result.props.postPreviews).toHaveLength(1);
    expect(result.props.postPreviews[0].title).toBe('Published');
  });

  it('includes posts with draft: false', async () => {
    mockedReaddirSync.mockReturnValue(['post.mdx'] as any);
    mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\ncontent');
    mockedSerialize.mockResolvedValue({
      frontmatter: { title: 'Explicit Non-Draft', description: 'desc', date: '2024-01-01', draft: false },
    } as any);

    const result = await getStaticProps();
    expect(result.props.postPreviews).toHaveLength(1);
    expect(result.props.postPreviews[0].title).toBe('Explicit Non-Draft');
  });

  it('includes posts with no draft field', async () => {
    mockedReaddirSync.mockReturnValue(['post.mdx'] as any);
    mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\ncontent');
    mockedSerialize.mockResolvedValue({
      frontmatter: { title: 'No Draft Field', description: 'desc', date: '2024-01-01' },
    } as any);

    const result = await getStaticProps();
    expect(result.props.postPreviews).toHaveLength(1);
    expect(result.props.postPreviews[0].title).toBe('No Draft Field');
  });
});
