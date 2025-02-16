import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import ReactSwitch from 'react-switch'
import { useEffect, useState } from 'react'
import { createTaskList } from '../http/create-task-list'
import { editTaskList } from '../http/edit-task-list'


const createTaskListForm = z.object({
    title: z.string().min(1, 'Informe o nome da lista'),
    description: z.string().min(1, 'Informe a descrição'),
    status: z.boolean()
})

type CreateTaskListForm = z.infer<typeof createTaskListForm>

interface ITaskList {
    taskList?: {
        id: string;
        title: string;
        description: string;
        status: boolean;
    }
}

export const CreateTaskList: React.FC<ITaskList> = ({taskList}) => {
    const queryClient = useQueryClient()
    const [status, setStatus] = useState(true)

    const { register, getValues, setValue, handleSubmit, formState, reset } =
    useForm<CreateTaskListForm>({
        resolver: zodResolver(createTaskListForm),
    })

    useEffect(()=>{
        if(taskList){
            setValue('status',taskList.status);
            setValue('title',taskList.title);
            setValue('description',taskList.description);
        }else{
            setValue('status',true);
        }
    },[taskList]);

    const handleCreateList = async (data: CreateTaskListForm) => {
        try {
            if(taskList?.id){
                await editTaskList(taskList?.id, data);
                toast.success('Lista editada com sucesso!')
            }else{
                await createTaskList(data)
                toast.success('Lista criada com sucesso!')
            }
            queryClient.invalidateQueries({ queryKey: ['task-list'] })
            reset()

        } catch {
            toast.error('Erro ao criar a lista, tente novamente!')
        }
    }

    return (
        <DialogContent>
        <div className="flex flex-col gap-6 h-full">
            <div className="flex-row flex-col gap-3">
                <div className="flex items-center justify-between">
                    <DialogTitle>Cadastrar Lista</DialogTitle>
                    <DialogClose>
                        <X className="size-5 text-zinc-600" />
                    </DialogClose>
                </div>

                <DialogDescription>
                    Adicione lista que você quer adicionar tarefas.
                </DialogDescription>
            </div>

            <form
                onSubmit={handleSubmit(handleCreateList)}
                className="flex-1 flex flex-col gap-4"
            >
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Status</Label>
              <ReactSwitch onChange={(e)=>{
                setValue('status',e);
                setStatus(e);
              }} checked={status} onColor='#0e7490' checkedIcon={false} uncheckedIcon={false}/>
            </div>  

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Nome da lista</Label>
                    <Input
                        id="title"
                        autoFocus
                        placeholder="Nome da lista"
                        {...register('title')}
                    />
                    {formState.errors.title && (
                        <p className="text-red-400 text-sm">
                        {formState.errors.title.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                        id="description"
                        autoFocus
                        placeholder="Descrição"
                        type="textarea"
                        {...register('description')}
                    />
                    {formState.errors.description && (
                        <p className="text-red-400 text-sm">
                        {formState.errors.description.message}
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
                    <Button onClick={()=>handleCreateList(getValues())} className="flex-1">Salvar</Button>
                </DialogClose>
            </div>
            </form>
        </div>
        </DialogContent>
    )
}
