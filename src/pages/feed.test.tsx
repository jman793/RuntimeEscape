import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from './feed.page';

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

const mockedReaddirSync = vi.mocked(readdirSync);
const mockedReadFileSync = vi.mocked(readFileSync);
const mockedSerialize = vi.mocked(serialize);

function makeMockRes() {
  const res = {
    setHeader: vi.fn(),
    write: vi.fn(),
    end: vi.fn(),
  };
  return res;
}

function makeMockCtx(res: ReturnType<typeof makeMockRes>) {
  return { res } as unknown as GetServerSidePropsContext;
}

describe('RSS feed getServerSideProps', () => {
  beforeEach(() => {
    mockedReaddirSync.mockReset();
    mockedReadFileSync.mockReset();
    mockedSerialize.mockReset();
  });

  it('sets content type to RSS XML', async () => {
    mockedReaddirSync.mockReturnValue([] as any);
    const res = makeMockRes();

    await getServerSideProps(makeMockCtx(res));

    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/rss+xml; charset=utf-8'
    );
  });

  it('includes non-draft posts in the feed', async () => {
    mockedReaddirSync.mockReturnValue(['post.mdx'] as any);
    mockedReadFileSync.mockReturnValue('---\ntitle: Test\n---\ncontent');
    mockedSerialize.mockResolvedValue({
      frontmatter: { title: 'My Post', description: 'A great post', date: '2024-01-01' },
    } as any);

    const res = makeMockRes();
    await getServerSideProps(makeMockCtx(res));

    const xml = res.write.mock.calls[0][0] as string;
    expect(xml).toContain('<title>My Post</title>');
    expect(xml).toContain('<description>A great post</description>');
    expect(xml).toContain('/post</link>');
  });

  it('excludes draft posts from the feed', async () => {
    mockedReaddirSync.mockReturnValue(['published.mdx', 'draft.mdx'] as any);
    mockedReadFileSync.mockReturnValue('content');
    mockedSerialize
      .mockResolvedValueOnce({
        frontmatter: { title: 'Published', description: 'desc', date: '2024-01-01' },
      } as any)
      .mockResolvedValueOnce({
        frontmatter: { title: 'Draft', description: 'desc', date: '2024-01-02', draft: true },
      } as any);

    const res = makeMockRes();
    await getServerSideProps(makeMockCtx(res));

    const xml = res.write.mock.calls[0][0] as string;
    expect(xml).toContain('<title>Published</title>');
    expect(xml).not.toContain('<title>Draft</title>');
  });

  it('escapes XML special characters in post content', async () => {
    mockedReaddirSync.mockReturnValue(['post.mdx'] as any);
    mockedReadFileSync.mockReturnValue('content');
    mockedSerialize.mockResolvedValue({
      frontmatter: { title: 'A & B <C>', description: 'Use "quotes"', date: '2024-01-01' },
    } as any);

    const res = makeMockRes();
    await getServerSideProps(makeMockCtx(res));

    const xml = res.write.mock.calls[0][0] as string;
    expect(xml).toContain('A &amp; B &lt;C&gt;');
    expect(xml).toContain('Use &quot;quotes&quot;');
  });
});
