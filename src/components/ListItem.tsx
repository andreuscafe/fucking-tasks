import { TaskType, useTasksStore } from "@/store";
import { dispatchEvent } from "@/utils";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  BiCheck,
  BiCircle,
  BiMenu,
  BiRightIndent,
  BiChevronDown,
  BiX
} from "react-icons/bi";
import ReactTextareaAutosize from "react-textarea-autosize";

type ListItemProps = {
  taskData: TaskType;
  addSubTaskFromParent?: () => void;
};

export const ListItem: FC<ListItemProps> = ({
  taskData,
  addSubTaskFromParent
}) => {
  const removeTask = useTasksStore.getState().removeTask;
  const toggleCompleted = useTasksStore.getState().toggleCompleted;
  const updateTask = useTasksStore.getState().updateTask;
  const addSubTask = useTasksStore.getState().addSubTask;
  const getSubTasks = useTasksStore.getState().getSubTasks;
  const timer = useRef<NodeJS.Timeout>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [completed, setCompleted] = useState(taskData.completed);
  const [subTasks, setSubTasks] = useState(getSubTasks(taskData.id) || []);
  const [openSubtasks, setOpenSubtasks] = useState(true);

  const refreshSubTasks = useCallback(() => {
    setSubTasks(getSubTasks(taskData.id) || []);
  }, [taskData.id, getSubTasks]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if there isn't a value and key is delete, delete the task
    if (!e.currentTarget.value && e.key === "Backspace") {
      deleteTask();
      return;
    }

    if (e.key === "Enter" || e.key === "NumpadEnter") {
      // if cmd + enter or ctrl + enter, mark task as completed
      if (e.metaKey || e.ctrlKey) {
        console.log("complete task", taskData.id);
        handleComplete(taskData.id);
      } else {
        e.stopPropagation();
        e.preventDefault();
        if (taskData.parentId && addSubTaskFromParent) {
          addSubTaskFromParent();
        } else {
          const newTask = useTasksStore.getState().addTask(taskData.listId);
          dispatchEvent("newtask", {
            listId: taskData.listId,
            parentId: taskData.parentId,
            taskId: newTask.id
          });
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;

    if (!e.currentTarget.value) {
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      updateTask(taskData.id, {
        ...taskData,
        content: newValue
      });
    }, 100);
  };

  const handleAddSubTask = () => {
    const newTask = addSubTask(taskData.listId, taskData.id);
    setSubTasks(getSubTasks(taskData.id) || []);

    dispatchEvent("newtask", {
      listId: newTask.listId,
      parentId: newTask.parentId,
      taskId: newTask.id
    });
  };

  const handleComplete = (id: number) => {
    setCompleted(!completed);
    toggleCompleted(id);
  };

  const handleAddSubTaskFromParent = () => {
    const newTask = addSubTask(taskData.listId, taskData.id);
    setSubTasks(getSubTasks(taskData.id) || []);
    dispatchEvent("newtask", {
      listId: newTask.listId,
      parentId: newTask.parentId,
      taskId: newTask.id
    });
  };

  const deleteTask = () => {
    removeTask(taskData.id);

    dispatchEvent("removedtask", {
      listId: taskData.listId,
      parentId: taskData.parentId,
      taskId: taskData.id
    });
  };

  const listenerNewTask = useCallback(
    (e: CustomEventInit) => {
      // Refresh subtasks
      if (e.detail.parentId === taskData.id) {
        refreshSubTasks();
      }
    },
    [taskData.id, refreshSubTasks]
  );

  useEffect(() => {
    if (window) {
      window.addEventListener("newtask", listenerNewTask);
      window.addEventListener("removedtask", refreshSubTasks);
    }

    return () => {
      window.removeEventListener("newtask", listenerNewTask);
      window.addEventListener("removedtask", refreshSubTasks);
    };
  }, [listenerNewTask, refreshSubTasks]);

  return (
    <li>
      {/* Main task */}
      <div
        className={`group/item relative flex gap-1 items-start leading-6 transition-opacity ${
          completed ? "opacity-40" : ""
        }`}
      >
        {subTasks.length ? (
          <div
            className="w-10 absolute left-0 top-0 -translate-x-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => setOpenSubtasks((o) => !o)}
          >
            <BiChevronDown
              size={24}
              className="opacity-30 group-hover/item:!opacity-100 transition-opacity"
            />
          </div>
        ) : null}

        <button
          className="flex-shrink-0 relative"
          tabIndex={-1}
          role={"button"}
          onClick={() => {
            handleComplete(taskData.id);
          }}
        >
          {/* <BiCircle size={36} /> */}
          <div className="w-8 h-8 border-[2px] border-neutral-700 rounded-full" />
          {completed && (
            <BiCheck
              size={36}
              className="absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </button>
        <ReactTextareaAutosize
          ref={textareaRef}
          placeholder="Escribí algo..."
          className={`text-lg text-neutral-400 placeholder:text-[#333] bg-transparent w-full resize-none outline-none focus:bg-neutral-900 focus:bg-opacity-20 transition-colors py-1 px-2 rounded  ${
            completed ? "line-through" : ""
          }`}
          rows={1}
          defaultValue={taskData.content}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          data-taskid={taskData.id}
          autoComplete="off"
          spellCheck="false"
        />
        {/* <button
          type="button"
          className="group/subtask w-10 absolute right-0 top-0 translate-x-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
          onClick={handleAddSubTask}
          tabIndex={-1}
        >
          <BiRightIndent
            size={24}
            className="opacity-0 group-hover/item:opacity-30 group-focus-within/item:opacity-30 group-hover/subtask:!opacity-100 group-focus-within/subtask:!opacity-100 transition-opacity"
          />
        </button> */}
        <button
          type="button"
          className="group/subtask w-10 absolute right-0 top-0 translate-x-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
          onClick={deleteTask}
          tabIndex={-1}
        >
          <BiX
            size={24}
            className="opacity-0 group-hover/item:opacity-30 group-focus-within/item:opacity-30 group-hover/subtask:!opacity-100 group-focus-within/subtask:!opacity-100 transition-opacity"
          />
        </button>
      </div>

      {/* Subtasks */}
      {openSubtasks ? (
        <ul
          className={`ml-10 ${
            subTasks.length
              ? "border-b border-white border-opacity-10 pb-2 mb-2"
              : ""
          }`}
        >
          {subTasks?.map((subTask) => (
            <ListItem
              key={subTask.id}
              taskData={subTask}
              addSubTaskFromParent={handleAddSubTaskFromParent}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};
