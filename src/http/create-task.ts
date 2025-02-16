export const createTask = async ({
  title,
  concluded,
  taskListId
}: CreateTaskRequest) => {
  const response = await fetch('http://localhost:3333/tasks', {
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
