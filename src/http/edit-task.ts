export const editTask = async (id: string, data:Task) => {
    console.log(data);
    const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/tasks?id='+id, {
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