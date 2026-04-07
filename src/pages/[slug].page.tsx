import { readFileSync } from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { POSTS_PATH } from "./constants";

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        {...props}
        className="text-primary-light underline decoration-primary/40 underline-offset-4 hover:text-primary hover:decoration-primary transition-colors"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      />
    );
  },
};

export default function PostPage({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title className="text-sky-600 border-2 border-black">{source.frontmatter.title as string}</title>
      </Head>
      <div className="w-1/2 mx-auto">
        <MDXRemote
          {...source}
          components={mdxComponents}
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
