export const deleteTaskList = async (id: string) => {
    const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/task-list?id='+id, {
      method: 'DELETE',
    })
    // const data = response.json()
  
    // return data
  
    if (!response.ok) {
      throw new Error('Error while deletind the task list')
    }
  }
  