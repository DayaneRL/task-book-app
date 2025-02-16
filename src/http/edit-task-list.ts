export const editTaskList = async (id: string, data:TaskList) => {
    const response = await fetch('http://localhost:3333/task-list?id='+id, {
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