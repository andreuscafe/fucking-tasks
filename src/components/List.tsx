import { ListType, useTasksStore } from "@/store";
import { FC, useCallback, useEffect, useState } from "react";
import { BiTrash, BiX } from "react-icons/bi";
import { ListItem } from "./ListItem";
import { NewItemInput } from "./NewItemInput";

type ListProps = {
  listData: ListType;
};

export const List: FC<ListProps> = ({ listData }) => {
  const [tasks, setTasks] = useState(
    useTasksStore.getState().getListTasks(listData.id)
  );
  const { updateListTitle, deleteList } = useTasksStore.getState();
  const [loaded, setLoaded] = useState(false);

  const refreshTasks = useCallback(
    (e: CustomEventInit) => {
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
              `textarea[data-taskid="${tasks[tasks.length - 1]?.id}"]`
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
    <section className="p-6 pb-5 mb-10 rounded-2xl backdrop-blur-xl border-[2px] border-neutral-700 relative">
      <div className="block absolute top-0 left-4 -translate-y-1/2 bg-[#0A0A0A]">
        <span className="p-4 whitespace-pre opacity-0">{listData.title}</span>
        <input
          onChange={(e) => {
            updateListTitle(listData.id, e.currentTarget.value || "");
          }}
          className="p-0 text-center bg-transparent absolute top-0 left-0 w-full h-full outline-none"
          defaultValue={listData.title}
          autoComplete="off"
          spellCheck="false"
          id={`list-title-${listData.id}`}
        />
      </div>

      <button
        className="absolute top-0 right-4 -translate-y-1/2 p-2 bg-[#0A0A0A] group"
        onClick={() => deleteList(listData.id)}
      >
        <BiX
          size={24}
          className="opacity-40 group-hover:opacity-100 transition-opacity"
        />
      </button>

      {/* <div className="pb-8 mb-8 border-b-[2px] border-neutral-700 flex justify-between">
        <span>{listData.title}</span>
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
