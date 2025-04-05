export const createTask = async ({
  title,
  concluded,
  taskListId
}: CreateTaskRequest) => {
  const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      concluded,
      taskListId
    }),
  })
  
  // const data = response.json()

  if (!response.ok) {
    throw new Error('Error while creating the Task')
  }

  // return data
}

interface CreateTaskRequest {
  title: string
  concluded: boolean
  taskListId: string
}
