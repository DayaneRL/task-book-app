export const createTaskConclusion = async (id: string, concluded:boolean) => {
  const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/tasks-conclusion', {
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
