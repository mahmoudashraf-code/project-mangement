import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle } from 'lucide-react'

interface AddTaskFormProps {
    onAddTask: (name: string) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
    const [taskName, setTaskName] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (taskName.trim()) {
            onAddTask(taskName)
            setTaskName('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
            <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a new task"
                className="flex-grow"
            />
            <Button type="submit" size="icon">
                <PlusCircle className="h-4 w-4" />
            </Button>
        </form>
    )
}

