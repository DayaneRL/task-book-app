export const deleteTaskList = async (id: string) => {
    const response = await fetch('http://localhost:3333/task-list?id='+id, {
      method: 'DELETE',
    })
    // const data = response.json()
  
    // return data
  
    if (!response.ok) {
      throw new Error('Error while deletind the task list')
    }
  }
  