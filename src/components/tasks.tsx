import { Circle, CircleCheck, EllipsisVertical } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTaskListTasks } from '../http/get-task-list-tasks'
import { createTaskConclusion } from '../http/update-task-conclusion'
import { DropdownMenu } from '@radix-ui/themes'
import { DialogTrigger } from './ui/dialog'
import { Dispatch, SetStateAction, useState } from 'react'
import ITask from '../Interface/ITask'
import { ConfirmModal } from './confirm-modal'

interface ITasks {
  setTask:Dispatch<SetStateAction<ITask | undefined>>;
  selectedListId: string | undefined;
}

export const Tasks: React.FC<ITasks> = ({setTask, selectedListId}) => {

  const [open, setOpen] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['task-list-tasks'],
    queryFn: () => getTaskListTasks(selectedListId??''),
    staleTime: 1000 * 60, // 60 seconds cache
  })

  if (!data) {
    return null
  }

  const handleCompleteTask = async (id: string, concluded: boolean) => {
    await createTaskConclusion(id, concluded)
    queryClient.invalidateQueries({ queryKey: ['task-list-tasks'] })
  }

  const handleEditTask = async (task:ITask) => {
    setTask(task);
  }

  const handleDelete = (id:string) => {
    setTaskId(id);
    setOpen(true);
  }

  return (
    <>
      {data.tasks?.map(task => {
        return (
          <div key={task.id} className="flex flex-col gap-4">
            <ul className="flex flex-col gap-3">
              <li key={task.id} className="grid grid-cols-8 gap-2 cursor-pointer">
                {task.concluded? 
                <CircleCheck className="size-4 text-cyan-500 hover:text-cyan-300"  onClick={()=>handleCompleteTask(task.id, !task.concluded)}/>
                :
                <Circle className="size-4 text-cyan-500 hover:text-cyan-300"  onClick={()=>handleCompleteTask(task.id, !task.concluded)}/>
                }
                <span className="text-sm text-zinc-400 hover:text-zinc-200 col-start-2 col-span-6"  onClick={()=>handleCompleteTask(task.id, !task.concluded)}>
                  {task.title}
                </span>
                <div className='justify-items-end'>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <EllipsisVertical className="size-5 text-cyan-500 hover:text-cyan-300" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DialogTrigger asChild>
                        <DropdownMenu.Item className='dropdown-item' onClick={()=>handleEditTask(task)}>Editar</DropdownMenu.Item>
                      </DialogTrigger>
                        <DropdownMenu.Item color="red" className='dropdown-item' onClick={()=>handleDelete(task.id)}>
                          Deletar
                        </DropdownMenu.Item>
                      
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              </li>
            </ul>
          </div>
        )
      })}
      <ConfirmModal open={open} setOpen={setOpen} taskId={taskId} selectedListId={selectedListId}/>
      </>
  )
}
