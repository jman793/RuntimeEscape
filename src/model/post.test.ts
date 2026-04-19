import { describe, it, expect } from 'vitest';
import type { BlogPost } from './post';

describe('BlogPost interface', () => {
  it('accepts an object with all required fields', () => {
    const post: BlogPost = {
      content: 'Post body content',
      title: 'Post Title',
      description: 'A description',
      slug: 'post-title',
      date: '2024-01-01',
    };
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('description');
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('date');
  });

  it('accepts an object with the optional draft field', () => {
    const post: BlogPost = {
      content: 'Post body content',
      title: 'Draft Post',
      description: 'A draft',
      slug: 'draft-post',
      date: '2024-01-01',
      draft: true,
    };
    expect(post).toHaveProperty('draft', true);
  });

  it('does not require the draft field', () => {
    const post: BlogPost = {
      content: 'Post body content',
      title: 'Published Post',
      description: 'A published post',
      slug: 'published-post',
      date: '2024-01-01',
    };
    expect(post.draft).toBeUndefined();
  });
});
