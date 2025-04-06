import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import logoTb from '../assets/logo-tb.svg'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'

import { Tasks } from './tasks'
import { getTaskListTasks } from '../http/get-task-list-tasks'
import { EmptyGoals } from './empty-task'
import { Dispatch, SetStateAction } from 'react'
import ITask from '../Interface/ITask'
import { ITaskList } from '../Interface/ITaskList'
import { toast } from 'sonner'


interface IData {
  selectedList: ITaskList | undefined;
  setTask:Dispatch<SetStateAction<ITask | undefined>>;
}

export const GoalList: React.FC<IData> = ({selectedList, setTask}) => {

  const defaultTask = {id:'', title:'',taskListId:'',concluded:false};

  const { data } = useQuery({
    queryKey: ['task-list-tasks'],
    queryFn: () => getTaskListTasks(selectedList?.id??''),
  })

  if (!data) {
    return ''
  }

  const completedAVG =
  Math.round(
    (data?.totalCompleted * 100) / data?.total
  )

  const handleNewTask = () => {
    toast.warning('Não é possível criar tarefas em lista desabilitadas.')
  }

  return (
    <>
      { data ? 
        <div className="py-10 px-5 mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoTb} width={180}/>
            </div>
            {(selectedList?.status==true) ? (
              <DialogTrigger asChild>
                <Button size="sm" onClick={()=>setTask(defaultTask)}>
                  <Plus className="size-4" />
                  Cadastrar tarefa
                </Button>
              </DialogTrigger>
            ):(
              <Button variant={'secondary'} size="sm" onClick={handleNewTask}>
                <Plus className="size-4" />
                Cadastrar tarefa
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Progress value={8} max={15}>
              <ProgressIndicator style={{ width: `${completedAVG}%` }} />
            </Progress>

            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span>
                Você completou{' '}
                <span className="text-zinc-100">{data?.totalCompleted}</span> de{' '}
                <span className="text-zinc-100">{data?.total}</span> tarefas dessa lista.
              </span>
              <span>{completedAVG}%</span>
            </div>
          </div>

          <Separator />


          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-medium">Tarefas {selectedList?.title? `- ${selectedList.title}`:''}</h2>

            {data.tasks ? (
               <Tasks setTask={setTask} selectedListId={selectedList?.id}/>
            ) : (
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Você ainda não completou nenhuma tarefa essa semana.</span>
              </div>
            )}
          </div>
        </div>
      :
        <EmptyGoals />
      }
    </>
  )
}
