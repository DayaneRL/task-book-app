export const deleteTask = async (id: string) => {
    const URL = import.meta.env.VITE_URL;
  const response = await fetch(URL+'/tasks?id='+id, {
      method: 'DELETE',
    })
    // const data = response.json()
  
    // return data
  
    if (!response.ok) {
      throw new Error('Error while deletind the task')
    }
  }
  