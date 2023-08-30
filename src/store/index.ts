import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskType = {
  id: number;
  content: string;
  completed: boolean;
  subTasks: TaskType["id"][];
  parentId?: TaskType["id"];
  listId: ListType["id"];
};

export type ListType = {
  id: number;
  title: string;
  tasks: TaskType["id"][];
};

export type TasksStore = {
  lists: ListType[];
  tasks: TaskType[];
  addTask: (listId: ListType["id"], task?: TaskType) => TaskType;
  removeTask: (id: TaskType["id"]) => void;
  toggleCompleted: (id: TaskType["id"], parentId?: TaskType["id"]) => void;
  updateTask: (id: TaskType["id"], updatedTask: TaskType) => void;
  addSubTask: (
    listId: ListType["id"],
    parentId: TaskType["id"],
    subTask?: TaskType
  ) => TaskType;
  getSubTasks: (parentId: TaskType["id"]) => TaskType[];
  getListTasks: (listId: ListType["id"]) => TaskType[];
};

const generateEmptyTask = (
  listId: ListType["id"],
  parentId?: TaskType["id"]
) => {
  const id = Date.now();

  return {
    id,
    content: ``,
    completed: false,
    subTasks: [],
    parentId,
    listId
  } as TaskType;
};

export const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      lists: [
        {
          id: 1,
          title: "List 1",
          tasks: [1, 2, 3]
        }
      ],
      tasks: [],
      addTask: (listId, task) => {
        const newTask = task ? task : generateEmptyTask(listId);

        set((state) => ({
          tasks: [...state.tasks, newTask]
        }));

        return newTask;
      },
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id && task.parentId !== id
          )
        })),
      toggleCompleted: (id, parentId) =>
        set((state) => {
          return {
            tasks: state.tasks.map((task) => {
              if (task.id === id) {
                return {
                  ...task,
                  completed: !task.completed
                };
              }
              return task;
            })
          };
        }),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              return updatedTask;
            }
            return task;
          })
        })),
      addSubTask: (listId, parentId, subTask) => {
        const newSubTask = subTask || generateEmptyTask(listId);
        newSubTask.parentId = parentId;
        get().addTask(listId, newSubTask);

        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === parentId) {
              return {
                ...task,
                subTasks: [...task.subTasks, newSubTask.id]
              };
            }
            return task;
          })
        }));

        return newSubTask;
      },
      getSubTasks: (parentId) => {
        const tasks = get().tasks;
        return tasks.filter((task) => task.parentId === parentId);
      },
      getListTasks: (listId) => {
        const tasks = get().tasks;
        return tasks.filter((task) => task.listId === listId);
      }
    }),
    {
      name: "tasks-storage"
    }
  )
);
