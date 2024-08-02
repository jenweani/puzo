import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <meta name='title' content='Puzo'></meta>
        <meta name="description" content="Trivial Game platform for teams" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main className='font-mono'>{children}</main>
    </>
  )
}
