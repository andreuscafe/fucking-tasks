import { List } from "@/components/List";
import { useTasksStore } from "@/store";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { lists } = useTasksStore((state) => ({
    lists: state.lists
  }));

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, [lists]);

  return (
    <>
      <Head>
        <title>Today | Split up your day</title>
      </Head>

      <main className="w-full max-w-screen-sm mx-auto px-5 min-h-screen pb-20 font-inter">
        <section className="max-w-screen-lg mx-auto pt-64 pb-10 flex justify-center">
          <span>Split up your day</span>
        </section>

        {loaded ? (
          lists?.map((list) => <List key={list.id} listData={list} />)
        ) : (
          <span className="opacity-40">Loading lists...</span>
        )}

        <button className="w-full py-6 bg-card-gray opacity-60 hover:opacity-100 transition-opacity rounded-3xl border border-white border-opacity-40">
          Add a new list
        </button>
      </main>
    </>
  );
}
