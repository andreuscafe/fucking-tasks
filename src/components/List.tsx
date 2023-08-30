import { ListType, useTasksStore } from "@/store";
import { FC, useCallback, useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import { NewItemInput } from "./NewItemInput";

type ListProps = {
  listData: ListType;
};

export const List: FC<ListProps> = ({ listData }) => {
  const [tasks, setTasks] = useState(
    useTasksStore.getState().getListTasks(listData.id)
  );
  const [loaded, setLoaded] = useState(false);

  const refreshTasks = useCallback(
    (e: CustomEventInit) => {
      console.log("refresh tasks", e.detail.listId);

      if (e.detail.listId === listData.id) {
        setTasks(useTasksStore.getState().getListTasks(listData.id));
      }
    },
    [listData.id]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);

    if (window) {
      window.addEventListener("newtask", refreshTasks);
      window.addEventListener("removedtask", refreshTasks);
    }

    return () => {
      if (window) {
        window.removeEventListener("newtask", refreshTasks);
        window.addEventListener("removedtask", refreshTasks);
      }
    };
  }, [tasks, refreshTasks]);

  return (
    <section className="p-10 mb-10 rounded-3xl backdrop-blur-xl border border-white border-opacity-40">
      <div className="pb-8 mb-8 border-b border-white border-opacity-40 flex justify-between">
        <span>Today</span>
        <span className="text-white text-opacity-60">Mon, 13th.</span>
      </div>
      {/* Tasks list */}
      <ul className="flex flex-col justify-start">
        {loaded ? (
          <>
            {tasks
              .filter((t) => !t.parentId)
              .map((task) => (
                <ListItem key={task.id} taskData={task} />
              ))}
            <NewItemInput listId={listData.id} />
          </>
        ) : (
          <span className="opacity-40">Loading tasks...</span>
        )}
      </ul>
    </section>
  );
};
