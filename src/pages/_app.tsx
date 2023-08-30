import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
