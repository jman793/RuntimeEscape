/** @type {import('next').NextConfig} */

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  // Uses negated pattern so *.test.tsx files in pages/ are not treated as routes
  pageExtensions: ['page.ts', 'page.tsx', 'page.js', 'page.jsx', 'mdx'],
}
 
export default nextConfig;
