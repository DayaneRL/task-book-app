import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-task'
import { GoalList } from './components/goal-list'
import { useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTaskLists } from './http/get-task-lists'
import { Loader2 } from 'lucide-react'
import { TaskList } from './components/task-list'
import ITask from './Interface/ITask'
import { ITaskList } from './Interface/ITaskList'

const App = () => {
  
  const [task, setTask] = useState<ITask>();
  const [selectedList, setSelectedList] = useState<ITaskList>({
    id: '',
    title: '',
    description: '',
    status:false
  });

  const queryClient = useQueryClient()

  const {data: taskLists, isLoading, isFetched} = useQuery({
    queryKey: ['task-list'],
    queryFn: getTaskLists,
    staleTime: 1000 * 60,
  })

  useMemo(()=>{
    if(isFetched && taskLists?.taskList?.length){
      setSelectedList(taskLists.taskList[0]??'');
    }
  },[isFetched])
  
  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ['task-list-tasks'] })
  },[selectedList]);

  return (
    <div>
      <div className='grid grid-cols-8 gap-2 flex flex-col'>
       
        <TaskList selectedList={selectedList} selectList={setSelectedList}/>
        
        <div className="col-start-4 col-span-3 flex-1 w-55">
          <Dialog>
            {isLoading ? (
              <div className="h-screen flex items-center justify-center">
                <Loader2 className="text-zinc-500 animate-spin size-10" />
              </div>
            ): 
              <GoalList selectedList={selectedList} setTask={setTask}/>
            }
            <CreateGoal selectedList={selectedList} task={task}/>
          </Dialog>
        </div>

      </div>
    </div>
  )
}
export default App
