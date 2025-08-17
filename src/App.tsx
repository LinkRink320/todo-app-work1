import React, { useState } from "react";
import { useHandleTasks, Task } from "./useHandleTasks";
import "./App.css";

const App: React.FC = () => {
  const { tasks, addTask, removeTask, setTaskDone } = useHandleTasks();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const categories = ["仕事", "プライベート", "勉強", "その他"];
  const [category, setCategory] = useState(categories[0]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  return (
    <>
      <div className="form">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タスク名"
          />
          <input
            type="date"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="期限 (任意)"
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="button"
            value="追加"
            onClick={() => {
              addTask({ title, done: false, dueDate: dueDate || null, category });
              setTitle("");
              setDueDate("");
              setCategory(categories[0]);
            }}
          />
        </div>
      </div>
      <div style={{ margin: "1em 0" }}>
        <span>カテゴリで絞り込み: </span>
        <button
          onClick={() => setFilterCategory(null)}
          style={{ fontWeight: !filterCategory ? "bold" : "normal" }}
        >すべて</button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{ fontWeight: filterCategory === cat ? "bold" : "normal", marginLeft: 4 }}
          >{cat}</button>
        ))}
      </div>
      <ul>
        {tasks
          .filter((task: Task) => !filterCategory || task.category === filterCategory)
          .slice()
          .sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate!.localeCompare(b.dueDate!);
          })
          .map((task, i) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.done;
            return (
              <li
                key={i}
                style={isOverdue ? { color: "red", fontWeight: "bold" } : {}}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => setTaskDone(task, e.target.checked)}
                  />
                  {task.title}
                  {task.dueDate && ` (期限: ${task.dueDate})`}
                  {task.category && (
                    <span style={{ marginLeft: 8, fontSize: "0.9em", color: "#555" }}>
                      [{task.category}]
                    </span>
                  )}
                </label>
                <button onClick={() => removeTask(task)}>×</button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default App;
