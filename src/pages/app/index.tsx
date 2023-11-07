import { List } from "@/components/List";
import { useTasksStore } from "@/store";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const phrases = [
  "La vida es una colección de momentos, asegúrate de vivir cada uno.",
  "La felicidad no es un destino, es un camino que eliges caminar.",
  "La verdadera riqueza está en las relaciones y experiencias, no en posesiones.",
  "La gratitud transforma lo que tienes en suficiente.",
  "Aprende a aceptar lo que no puedes cambiar y a cambiar lo que no puedes aceptar.",
  "La mejor inversión que puedes hacer es en ti mismo.",
  "Cada día es una página en blanco, escribe una gran historia.",
  "La paz interior comienza cuando te aceptas a ti mismo.",
  "No mires atrás con arrepentimiento, mira adelante con esperanza.",
  "La vida es frágil, valora cada momento y a las personas que amas."
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { lists } = useTasksStore((state) => ({
    lists: state.lists
  }));
  const [clientPhrase, setClientPhrase] = useState(phrases[0]);

  useEffect(() => {
    setLoaded(true);

    setClientPhrase(phrases[Math.floor(Math.random() * phrases.length)]);

    setTimeout(() => {
      // Focus textarea
      const textarea = document.querySelector(
        `#new-task-input`
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    }, 10);
  }, [lists]);

  return (
    <>
      <Head>
        <title>Today | Split up your day</title>
      </Head>

      <main className="w-full max-w-screen-sm mx-auto px-5 min-h-screen pb-20 font-inter flex flex-col justify-center">
        <section className="max-w-screen-lg mx-auto py-10 block w-full text-center">
          <p className="text-neutral-700">{clientPhrase}</p>
        </section>

        {lists?.map((list) => (
          <List key={list.id} listData={list} />
        ))}

        {/* {loaded ? (
          <>
            {lists?.map((list) => (
              <List key={list.id} listData={list} />
            ))}
            <button className="w-full py-6 opacity-40 hover:opacity-100 transition-opacity rounded-3xl border-[2px] border-white border-opacity-20">
              Agregar lista
            </button>
          </>
        ) : (
          <span className="opacity-40 text-center p-8 block">
            Loading lists...
          </span>
        )} */}
      </main>
    </>
  );
}
