export const deleteTask = async (id: string) => {
    const response = await fetch('http://localhost:3333/tasks?id='+id, {
      method: 'DELETE',
    })
    // const data = response.json()
  
    // return data
  
    if (!response.ok) {
      throw new Error('Error while deletind the task')
    }
  }
  