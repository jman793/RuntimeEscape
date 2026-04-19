import { readdirSync, readFileSync } from "fs";
import { GetServerSidePropsContext } from "next";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { POSTS_PATH, SITE_URL } from "./constants";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss(posts: { title: string; description: string; slug: string; date: string }[]): string {
  const items = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/${post.slug}</link>
      <guid>${SITE_URL}/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RuntimeEscape</title>
    <link>${SITE_URL}</link>
    <description>A blog about general computing by Jonah Marz</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const postFilePaths = readdirSync(POSTS_PATH).filter(
    (filePath) => path.extname(filePath).toLowerCase() === ".mdx"
  );

  const posts: { title: string; description: string; slug: string; date: string }[] = [];

  for (const filePath of postFilePaths) {
    const file = readFileSync(path.join(POSTS_PATH, filePath), "utf8");
    const serialized = await serialize(file, { parseFrontmatter: true });
    const { frontmatter } = serialized;

    if (frontmatter.draft == true) continue;

    posts.push({
      title: (frontmatter.title as string) || "",
      description: (frontmatter.description as string) || "",
      slug: filePath.replace(".mdx", ""),
      date: (frontmatter.date as string) || "",
    });
  }

  const rss = generateRss(posts);

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default function Feed() {
  return null;
}
