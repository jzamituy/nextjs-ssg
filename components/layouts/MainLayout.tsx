import { FC } from "react";

import Head from "next/head";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Next.js app" />
        <meta name="author" content="Jorge Zamit - jzamit@gmail.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>

      <footer style={{ height: "100px", background: "green" }}>
        <p>Footer</p>
      </footer>
    </>
  );
};
