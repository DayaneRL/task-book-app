export const createTaskList = async ({
  title,
  description,
  status
}: CreateTaskListRequest) => {
  const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/task-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status
    }),
  })
  
  // const data = response.json()

  if (!response.ok) {
    throw new Error('Error while creating the task')
  }

  // return data
}

interface CreateTaskListRequest {
  title: string
  description: string
  status: boolean
}
  