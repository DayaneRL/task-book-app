export const editTaskList = async (id: string, data:TaskList) => {
    const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/task-list?id='+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
  
    if (!response.ok) {
      throw new Error('Error while editing the task list')
    }
  }
  
type TaskList = {
    title: string
    description: string
    status: boolean
}