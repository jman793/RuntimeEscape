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
});
