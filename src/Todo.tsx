import { useEffect, useState } from "react";
import { todoType } from "./vite-env";
const Todo = () => {
  const getTodos = () => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  };
  const [todo, settodo] = useState<todoType["title"]>("");
  const [todos, setTodos] = useState<todoType[]>(getTodos());
  const [updateId, setupdateId] = useState<todoType["id"]>();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handelSubmit = () => {
    const newTodo: todoType = {
      id: Math.floor(Math.random() * 1000),
      title: todo,
      isCompleted: false,
    };
    if (updateId) {
      const Todos = [...todos];
      console.log(Todos, "Todos");
      Todos.forEach((item) => {
        if (item.id === updateId) {
          item.title = todo;
        }
      });
      console.log(Todos, "Todos");
      setTodos(Todos);
      settodo("");
    } else {
      setTodos((prev) => [...prev, newTodo]);

      settodo("");
    }
  };

  const handelDelete = (id: todoType["id"]) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const handelEdit = (id: todoType["id"]) => {
    setupdateId(id);
    const idx = todos.findIndex((todo) => todo.id == id);
    settodo(todos[idx].title);
  };

  const handelComplete = (id: todoType["id"]) => {
    const Todos = [...todos];
    // console.log(Todos, "Todos");
    Todos.forEach((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
    });
    console.log(Todos, "Todos");
    setTodos(Todos);
  };
  return (
    <div className="h-screen">
      <div className="h-3/4">
        {todos?.map((item, i) => {
          return (
            <div key={i}>
              <div className="flex my-8  justify-between">
                <p className="left text-xl font-semibold">
                  <span>{i + 1}.</span> {item.title}
                </p>
                <div className="right flex items-center gap-4 ">
                  <input
                    onChange={() => handelComplete(item.id)}
                    className="  cursor-pointer  w-6 h-6"
                    type="checkbox"
                    checked={item.isCompleted}
                  />

                  <img
                    onClick={() => handelEdit(item.id)}
                    className="w-8 cursor-pointer h-8"
                    src="edit.png"
                    alt=""
                  />
                  <img
                    onClick={() => handelDelete(item.id)}
                    className="w-8 cursor-pointer h-8"
                    src="delete.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="divide-y divide-dashed  bg-red-100"></div>
            </div>
          );
        })}
      </div>

      <div className="botton  flex flex-col gap-2 w-full">
        <form className="flex flex-col gap-2 w-full" onSubmit={handelSubmit}>
          <input
            onChange={(e) => settodo(e.target.value)}
            className=" border-dashed border-2 border-sky-500 focus:outline-none rounded-md py-1 px-2 font-sans font-semibold"
            placeholder="New Task"
            type="text"
            required
            value={todo}
          />
          <button
            type="submit"
            className="bg-red-600 py-2 text-white font-sans font-semibold rounded-md">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
