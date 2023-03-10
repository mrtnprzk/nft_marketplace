import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Footer, Navbar } from "../components";
import { NFTProvider } from "../context/NFTContex";

import "../styles/globals.css";
import Script from "next/script";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Script
          src="https://kit.fontawesome.com/4bbbb6f50d.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </NFTProvider>
  );
};

export default App;
