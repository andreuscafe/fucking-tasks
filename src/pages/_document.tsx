import { Html, Head, Main, NextScript } from "next/document";

const defaultTitle = "Daily Tasks";
const defaultDescription =
  "So, everything is about what do you have to do today.";
const defaultDomain = "daily-tasks.vercel.app";
const defaultUrl = `https://${defaultDomain}`;
const defaultOgPath = "/img/preview.png";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content={defaultTitle} />
        <meta name="description" content={defaultDescription} />

        {/* <!-- Open Graph / Facebook --/> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultUrl + defaultOgPath} />

        <meta
          name="theme-color"
          content="#fff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111"
          media="(prefers-color-scheme: dark)"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultUrl + defaultOgPath} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={defaultDomain} />
        <meta property="twitter:url" content={defaultUrl} />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultUrl + defaultOgPath} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-black text-[#CECECE]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
