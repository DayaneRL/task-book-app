import { ITaskList } from "../Interface/ITaskList"

export const getTaskLists = async (): Promise<TaskListResponse> => {
  const response = await fetch('http://localhost:3333/task-list')
  const data = await response.json()

  return data
}

export type TaskListResponse = {
  taskList : ITaskList[]
}