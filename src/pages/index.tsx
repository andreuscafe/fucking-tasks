import { Header } from "@/components/Header";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`min-h-screen font-inter`}>
      <section className="max-w-screen-lg mx-auto py-64 flex justify-center">
        <Link
          href={"/app"}
          className="px-10 py-6 rounded-2xl bg-white text-black"
        >
          Launch app
        </Link>
      </section>
    </main>
  );
}
