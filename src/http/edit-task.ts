export const editTask = async (id: string, data:Task) => {
    console.log(data);
    const response = await fetch('http://localhost:3333/tasks?id='+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
  
    if (!response.ok) {
      throw new Error('Error while editing the task')
    }
  }
  
type Task = {
    title: string
    concluded: boolean
    taskListId?: string
}