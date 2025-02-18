import React,{ useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { List } from "@/src/components/List/List";
import { getTasksFromLocalStorage } from "@/utils";
import { Formdata } from "@/interfaces";
import { useDate } from "@/src/hooks/useDate";

export default function Home() {
  const [tasks, setTasks] = useState<Formdata[]>(getTasksFromLocalStorage());
  const { time } = useDate();

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Formdata>();

  useEffect(() => {
    const parsedTasks = JSON.parse(localStorage.getItem("tasks")!);
    if (parsedTasks) {
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }, [tasks]);

  const notify = () => toast.success("Task Added!");

  const onSubmit = ({ task }: Formdata) => {
    let newTask = {
      id: uuidv4(),
      task,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
    notify();
    setValue("task", "");
  };

  const onComplete = (id: string): void => {
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isComplete: !item.isComplete,
        };
      } else return item;
    });

    setTasks(newTasks);
  };

  const onDelete = (id: string): void => {
    const filteredTask = tasks.filter((task) => task.id !== id);

    setTasks(filteredTask);
  };

  return (
    <div className="flex items-center justify-center px-4 bg-black h-screen overflow-hidden">
      <section className="md:max-w-md lg:max-w-lg overflow-hidden flex flex-col items-center w-full h-2/3 bg-slate-900 p-2 text-center rounded-2xl shadow-2xl border-2 border-slate-900">
        <p className="text-white"> {time} </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl text-white mb-8">Welcome</h1>
          <section className="w-full">
            <input
              {...register("task", {
                required: true,
                minLength: 5,
                maxLength: 30,
              })}
              type="text"
              autoComplete="false"
              placeholder="Write a task"
              className="rounded-lg p-2 w-3/4  border-none outline-none hover:outline-green-600 mr-4"
            />
            <input
              className="p-2 rounded-lg border-none bg-green-600 cursor-pointer text-white"
              value="Add"
              type="submit"
            />
          </section>

          <span className="w-full flex px-5 mt-1">
            {errors.task && (
              <span className="text-start text-xs text-red-600">
                This field is required
              </span>
            )}
          </span>
          <section className="w-full relative">
            <List tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
          </section>

          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
        </form>
      </section>
    </div>
  );
}
