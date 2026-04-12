import type { AppProps } from "next/app"
import Layout from "../components/layout"
import "@/styles/colors.css"
import "@/styles/globals.css"
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={roboto.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      <Analytics />
    </>
  )
}
