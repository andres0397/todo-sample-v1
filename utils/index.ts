export const getTasksFromLocalStorage = () => {
  let tasks = [];
  if (typeof window !== "undefined") {
    tasks = JSON.parse(localStorage.getItem("tasks")!) || [];
  }

  return tasks;
};
