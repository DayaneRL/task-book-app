import ITask from "../Interface/ITask"

export const getTaskListTasks = async (taskListId: string): Promise<TaskListTasksResponse> => {
  const response = await fetch('http://localhost:3333/task-list-tasks?taskListId='+(taskListId??''))
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
