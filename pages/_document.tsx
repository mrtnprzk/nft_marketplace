import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="font-poppins bg-white min-h-screen dark:bg-nft-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
