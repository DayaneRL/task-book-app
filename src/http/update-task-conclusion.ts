export const createTaskConclusion = async (id: string, concluded:boolean) => {
  const response = await fetch('http://localhost:3333/tasks-conclusion', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      concluded,
    }),
  })
  // const data = response.json()

  // return data

  if (!response.ok) {
    throw new Error('Error while creating the task conclusion')
  }
}
