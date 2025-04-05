import ITask from "../Interface/ITask"

export const getTaskListTasks = async (taskListId: string): Promise<TaskListTasksResponse> => {
  const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/task-list-tasks?taskListId='+(taskListId??''))
  const data = response.json()

  return data
}

type TaskListTasksResponse = {
  tasks : {
    id: string;
    title: string;
    concluded: boolean;
  }[],
  total: number,
  totalCompleted: number
}
