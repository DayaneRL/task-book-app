import { Plus } from 'lucide-react'
import logo from '../assets/logo-in-orbit.svg'
import letsStart from '../assets/lets-start-illustration.svg'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

export const EmptyGoals = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo in.orbit" />
      <img src={letsStart} alt="default in.orbit" />
      <p className="text-zinc-300 leading-relaxed">
        Você ainda não cadastrou nenhuma tarefa, que tal cadastrar um agora?
      </p>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar tarefa
        </Button>
      </DialogTrigger>
    </div>
  )
}
