import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { X } from 'lucide-react'
import { Button } from './ui/button'
import {useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTask } from '../http/create-task'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { editTask } from '../http/edit-task'
import ITask from '../Interface/ITask'
import { ITaskList } from '../Interface/ITaskList'

interface IData {
  selectedList: ITaskList | undefined;
  task: ITask | undefined
}

const createTaskForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
})

type CreateTaskForm = z.infer<typeof createTaskForm>

export const CreateGoal: React.FC<IData> = ({selectedList, task}) => {
  const queryClient = useQueryClient()

  const { register, getValues, setValue, formState, reset } =
    useForm<CreateTaskForm>({
      resolver: zodResolver(createTaskForm),
  })

  useEffect(()=>{
    if(task){
      setValue('title',task.title);
    }
  },[task]);

  const handleCreateGoal = async (data: CreateTaskForm) => {
    try {
      
      if(task?.id){
        await editTask(task?.id, {...task, title: data.title});
        toast.success('Tarefa editada com sucesso!')
      }
      else{
        
        if(selectedList?.id){
          await createTask({
            title: data.title,
            concluded: false,
            taskListId: selectedList.id ?? ''
          })

          toast.success('Tarefa criada com sucesso!')
        }else{
          toast.success('Não foi possível encontrar o identificador da lista.')
        }
        
      }

      queryClient.invalidateQueries({ queryKey: ['task-list-tasks'] })
      reset()

    } catch {
      toast.error('Erro ao criar a tarefa, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar tarefa</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione tarefas que você quer realizar.
          </DialogDescription>
        </div>

        <form
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Nome da tarefa</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Nome da tarefa"
                {...register('title')}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={()=>handleCreateGoal(getValues())} className="flex-1">Salvar</Button>
            </DialogClose>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
