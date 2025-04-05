
import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from 'react';
import "./styles.css";
import { X } from 'lucide-react'
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../http/delete-task";
import { getTaskListTasks } from "../http/get-task-list-tasks";

interface ITModalProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
    taskId: string;
    selectedListId: string | undefined;
}

export const ConfirmModal: React.FC<ITModalProps> = ({open, setOpen, taskId, selectedListId})=>{

    const queryClient = useQueryClient();

    useQuery({
        queryKey: ['task-list-tasks'],
        queryFn: () => getTaskListTasks(selectedListId??''),
    })

    const handleDeleteTask = async (id: string) => {
        if(id){
            await deleteTask(id)
            toast.success('Task removida com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['task-list-tasks'] })
        }
    }

    return(
        <Dialog.Root open={open} onOpenChange={setOpen}>

            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Deletar</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Tem certeza que deseja remover esse item?
                    </Dialog.Description>
                
                    <div style={{ display: "flex", marginTop: 25, justifyContent: "center" }}>
                        <Dialog.Close asChild>
                            <Button variant="secondary" className="flex-1 text-slate-100 mr-4">Cancelar</Button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <Button className="flex-1" onClick={()=>handleDeleteTask(taskId)}>Confirmar</Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <X className="size-5 text-cyan-800" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
