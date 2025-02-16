import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTaskLists } from '../http/get-task-lists'
import { ChevronRight, Loader2, Plus, EllipsisVertical } from 'lucide-react'
import { Dialog, DialogTrigger } from './ui/dialog'
import { CreateTaskList } from './create-task-list'
import { DropdownMenu } from '@radix-ui/themes'
import './styles.css';
import { toast } from 'sonner'
import { deleteTaskList } from '../http/delete-task-list'
import { Dispatch, SetStateAction, useState } from 'react'
import { ITaskList } from '../Interface/ITaskList'

interface ITaskListProps {
  selectedList: ITaskList;
  selectList: Dispatch<SetStateAction<ITaskList>>;
}

export const TaskList: React.FC<ITaskListProps> = ({selectedList, selectList}) => {
  
  const nulltaskList = {id:'', title:'',description:'',status:true};
  const [taskList, setTaskList] = useState<ITaskList>();
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery({
    queryKey: ['task-list'],
    queryFn: getTaskLists,
    staleTime: 1000 * 60,
  })

  const handleDeleteTaskList = async (id: string) => {
    await deleteTaskList(id)
    toast.success('Removido com sucesso!')
    queryClient.invalidateQueries({ queryKey: ['task-list'] })
  }

  const handleEditTaskList = async (taskList:ITaskList) => {
    console.log(taskList);
    setTaskList(taskList);
  }

  return(
    <div className="col-span-2 flex-none w-35">
      <div className='py-10 pl-10'>
        
        <Dialog>
          <div className='flex place-content-between items-center pb-3'>
            <h2 className="text-xl font-medium ">Lista</h2>
            <DialogTrigger asChild>
              <Plus className="size-5 cursor-pointer" onClick={()=>setTaskList(nulltaskList)}/>
            </DialogTrigger>
          </div>
          <CreateTaskList taskList={taskList}/>

        {isLoading && (
          <div className="h-screen flex items-center justify-center">
            <Loader2 className="text-zinc-500 animate-spin size-10" />
          </div>
        )}

        <div className="flex flex-col  gap-2">
          {data?.taskList?.map((listItem:any)=>(
            <div>
              <div className='flex items-center grid grid-cols-12 cursor-pointer'>
                <ChevronRight className={`size-4 text-cyan-500 ${listItem.status==false&&'text-slate-600'}`} /> 
                <h3 className={`ps-2 font-medium col-start-2 col-span-10 hover:text-cyan-300 
                    ${selectedList?.id==listItem.id&&'text-cyan-500'}
                    ${listItem.status==false&&'text-slate-600'}
                `}
                 onClick={()=>{
                  selectList(listItem)
                }}>{listItem.title}</h3>
                <div className='justify-items-end'>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <EllipsisVertical className={`size-5 text-cyan-500 hover:text-cyan-300 ${listItem.status==false&&'text-slate-600'}`} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DialogTrigger asChild>
                        <DropdownMenu.Item className='dropdown-item' onClick={()=>handleEditTaskList(listItem)}>Editar</DropdownMenu.Item>
                      </DialogTrigger>
                      <DropdownMenu.Item color="red" className='dropdown-item' onClick={()=>handleDeleteTaskList(listItem.id)}>
                        Deletar
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              </div>
              <p className='text-xs text-zinc-500'>
                {listItem.description}
              </p>
            </div>
          ))}
        </div>

        </Dialog>
      </div>
    </div>
  )
}