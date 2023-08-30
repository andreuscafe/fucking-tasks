import { ListType, useTasksStore } from "@/store";
import { dispatchEvent } from "@/utils";
import { FC, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

type NewItemInputProps = {
  listId: ListType["id"];
  completed?: boolean;
};

export const NewItemInput: FC<NewItemInputProps> = ({
  listId,
  completed = false
}) => {
  const addTask = useTasksStore.getState().addTask;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.value) {
        return;
      }

      const newTask = addTask(listId, {
        id: Date.now(),
        content: e.currentTarget.value,
        completed: false,
        subTasks: [],
        listId
      });

      dispatchEvent("newtask", {
        listId: newTask.listId,
        parentId: newTask.parentId,
        taskId: newTask.id
      });

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <li className={`relative flex gap-1 py-2 items-start leading-6 group/item`}>
      {/* <BiCircle size={36} className="flex-shrink-0 opacity-20" /> */}
      <TextareaAutosize
        ref={textAreaRef}
        placeholder="Write a new task"
        className="text-lg placeholder:text-[#666] bg-transparent w-full resize-none outline-none focus:bg-white focus:bg-opacity-5 py-1 px-2 rounded"
        rows={1}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};