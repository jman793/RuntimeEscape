import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-mdx-remote', () => ({
  MDXRemote: ({ compiledSource }: { compiledSource: string }) => (
    <div data-testid="mdx-content">{compiledSource}</div>
  ),
}));

vi.mock('fs', () => {
  const mock = {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  };
  return { ...mock, default: mock };
});

vi.mock('next-mdx-remote/serialize', () => ({
  serialize: vi.fn(),
}));

import { existsSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import PostPage, { getStaticProps } from './[slug].page';
import type { GetStaticPropsContext } from 'next';

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
    expect(screen.getByRole('heading', { level: 1, name: 'My Test Post' })).toBeInTheDocument();
  });

  it('renders the post description and date', () => {
    render(<PostPage source={mockSource as any} />);
    expect(screen.getByText('A test description')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('renders the MDX content area', () => {
    render(<PostPage source={mockSource as any} />);
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument();
    expect(screen.getByText('Rendered MDX content')).toBeInTheDocument();
  });
});

describe('PostPage getStaticProps draft handling', () => {
  const mockedExistsSync = vi.mocked(existsSync);
  const mockedReadFileSync = vi.mocked(readFileSync);
  const mockedSerialize = vi.mocked(serialize);

  const makeCtx = (slug: string) =>
    ({ params: { slug } }) as GetStaticPropsContext<{ slug: string }>;

  beforeEach(() => {
    mockedExistsSync.mockReset();
    mockedReadFileSync.mockReset();
    mockedSerialize.mockReset();
  });

  it('returns notFound for a draft post', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFileSync.mockReturnValue('---\ntitle: Draft\ndraft: true\n---\ncontent' as any);
    mockedSerialize.mockResolvedValue({
      frontmatter: { title: 'Draft', draft: true },
    } as any);

    const result = await getStaticProps(makeCtx('draft-post'));
    expect(result).toHaveProperty('notFound', true);
  });

  it('returns the source for a non-draft post', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFileSync.mockReturnValue('---\ntitle: Published\n---\ncontent' as any);
    const mockMdx = {
      compiledSource: 'compiled',
      frontmatter: { title: 'Published', draft: false },
    };
    mockedSerialize.mockResolvedValue(mockMdx as any);

    const result = await getStaticProps(makeCtx('published-post'));
    expect(result).toHaveProperty('props.source', mockMdx);
  });

  it('returns the source when draft field is absent', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFileSync.mockReturnValue('---\ntitle: No Draft\n---\ncontent' as any);
    const mockMdx = {
      compiledSource: 'compiled',
      frontmatter: { title: 'No Draft' },
    };
    mockedSerialize.mockResolvedValue(mockMdx as any);

    const result = await getStaticProps(makeCtx('no-draft-post'));
    expect(result).toHaveProperty('props.source', mockMdx);
  });
});
