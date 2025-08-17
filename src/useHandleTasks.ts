import { useState, useEffect } from "react";

export type Task = {
  title: string;
  done: boolean;
  dueDate?: string | null;
  category: string;
};

export const useHandleTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // 破損時は初期値
      }
    }
    return [
      {
        title: "買い物",
        done: true,
        dueDate: null,
        category: "プライベート",
      },
      {
        title: "メール返信",
        done: false,
        dueDate: null,
        category: "仕事",
      },
      {
        title: "レポート提出",
        done: false,
        dueDate: null,
        category: "勉強",
      },
    ];
  });

  // tasksが変わるたびにlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (task: Task) => {
    setTasks(tasks.filter((_) => _ !== task));
  };

  const setTaskDone = (task: Task, done: boolean) => {
    setTasks(
      tasks.map((_) =>
        _ !== task
          ? _
          : {
              ...task,
              done,
            }
      )
    );
  };

  return {
    tasks,
    addTask,
    removeTask,
    setTaskDone,
  };
};
