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
      console.log("refresh tasks", e.detail.listId, e.detail.taskId);

      if (e.detail.listId === listData.id) {
        setTasks(useTasksStore.getState().getListTasks(listData.id));
      }

      setTimeout(() => {
        // Focus textarea
        if (e.detail.taskId) {
          const textarea = document.querySelector(
            `textarea[data-taskid="${e.detail.taskId}"]`
          ) as HTMLTextAreaElement;

          if (textarea) {
            textarea.focus();
          } else {
            const lastTask = document.querySelector(
              `textarea[data-taskid="${tasks[tasks.length - 1].id}"]`
            ) as HTMLTextAreaElement;

            if (lastTask) {
              lastTask.focus();
            }
          }
        }
      }, 10);
    },
    [listData.id, tasks]
  );

  useEffect(() => {
    setLoaded(true);

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
    <section className="p-10 mb-10 rounded-3xl backdrop-blur-xl border-[2px] border-neutral-700">
      {/* <div className="pb-8 mb-8 border-b-[2px] border-neutral-700 flex justify-between">
        <span>Today</span>
        <span className="text-white text-opacity-60">Clear</span>
      </div> */}
      {/* Tasks list */}
      <ul className="flex flex-col justify-start gap-2">
        {loaded ? (
          <>
            {tasks
              .filter((t) => !t.parentId)
              .map((task) => (
                <ListItem key={task.id} taskData={task} />
              ))}

            {!tasks.length && <NewItemInput listId={listData.id} />}
          </>
        ) : (
          <span className="opacity-40 p-4 block">Loading tasks...</span>
        )}
      </ul>
    </section>
  );
};
