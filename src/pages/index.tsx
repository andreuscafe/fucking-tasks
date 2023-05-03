import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Proof of Funds - Argentina</title>
      </Head>
      <main
        className={`min-h-screen max-w-screen-2xl mx-auto p-5 lg:p-8 pb-12 font-inter`}
      >
        <header className=" grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#F5F5F7]">
          Header
        </header>

        <section className="mt-10 lg:mt-36">Section</section>

        <footer className="mt-12 ">Footer</footer>
      </main>
    </>
  );
}
