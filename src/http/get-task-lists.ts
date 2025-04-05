import { ITaskList } from "../Interface/ITaskList"

export const getTaskLists = async (): Promise<TaskListResponse> => {
  const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/task-list')
  const data = await response.json()

  return data
}

export type TaskListResponse = {
  taskList : ITaskList[]
}