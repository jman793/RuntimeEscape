import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — RuntimeEscape</title>
      </Head>
      <main>
        <div className="layout py-12">
          <div className="mx-auto max-w-2xl border border-border bg-neutral-muted">
            <div className="flex items-center gap-2 border-b border-border bg-neutral px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-text-muted">~/RuntimeEscape</span>
            </div>

            <div className="px-6 py-8 font-mono text-sm leading-relaxed">
              <p className="text-text-muted">
                <span className="text-primary-light">$</span> resolve --path {"<requested>"}
              </p>

              <pre className="mt-4 whitespace-pre-wrap text-secondary-light">
{`Traceback (most recent call last):
  File "router.ts", line 404, in resolve
    return page.render(requested)
PageNotFoundError: the runtime escaped before rendering
`}
              </pre>

              <h1 className="mt-6 text-6xl font-bold tracking-tight md:text-8xl">404</h1>
              <p className="mt-2 text-lg text-text-muted">
                This page isn&apos;t in memory — or it never was.
              </p>

              <p className="mt-8 text-text-muted">
                <span className="text-primary-light">$</span>{" "}
                <Link href="/" className="text-primary-light animated-underline">
                  cd ~
                </Link>
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-text align-middle" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
