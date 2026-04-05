import { readFileSync } from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { POSTS_PATH } from "./constants";

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title className="text-sky-600 border-2 border-black">{source.frontmatter.title as string}</title>
      </Head>
      <div className="text-center">
        <MDXRemote
          {...source}
        // Load custom components here
        />
      </div>
    </div>
  )
}


export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string
  }>,
) {
  const { slug } = ctx.params!;

  // Get MDX from the file clicked on
  const postFile = readFileSync(path.join(POSTS_PATH, `${slug}.mdx`));

  const mdxSource = await serialize(postFile, { parseFrontmatter: true });
  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  }
}
