import { readdirSync, readFileSync } from "fs";
import { InferGetStaticPropsType } from "next";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { BlogPost } from "../model/post";
import { POSTS_PATH } from "./constants";

export default function Home({ postPreviews }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div className="p-4">
        <p className="homepage-p">Hello, welcome to RuntimeEscape. I haven&apos;t decided what this blog will be yet, but chances are it&apos;ll have something to do with computers.</p>

        <p className="homepage-p">This is all on <a target="_blank" className="text-primary-light" href="https://github.com/jman793/RuntimeEscape">github</a>, please open an issue if you have feedback for this site.</p>

        <p className="homepage-p">Feel free to use it for whatever you want; there is nothing new under the sun, and code is meant to be reused.</p>
      </div>
      <div>
        {postPreviews.map((postPreview, i) => {
          return (
            <div key={i} className="flex justify-center pb-4">
              <MDXFeedItem postPreview={postPreview} />
            </div>
          )
        })}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const postFilePaths = readdirSync(POSTS_PATH)
    .filter((filePath) => path.extname(filePath).toLowerCase() === '.mdx')

  const postPreviews: BlogPost[] = [];

  // Read files and serialize 
  for (const filePath of postFilePaths) {
    const file = readFileSync(path.join(POSTS_PATH, filePath), "utf8");


    const serializedPost = await serialize(file, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      slug: filePath.replace(".mdx", ""),
    } as BlogPost)
  }

  return {
    props: {
      postPreviews: postPreviews,
    },
    // enable ISR
    revalidate: 60,
  }
}


function MDXFeedItem({ postPreview }: { postPreview: BlogPost }) {
  return (
    <div className="w-3/6 h-64 bg-neutral-muted border border-border flex flex-col">
      <Link href={postPreview.slug} className="flex flex-col h-full">
        <div className="px-6 pt-4 pb-2 border-b border-border">
          <h2 className="text-center">{postPreview.title}</h2>
          <p className="text-center text-sm text-gray-400">{postPreview.date}</p>
        </div>
        <div className="px-6 py-4 flex-1 flex items-center justify-center">
          <p className="text-center">{postPreview.description}</p>
        </div>
      </Link>
    </div>
  )
}
