import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Project } from '@/types/iProject'

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (project: Project) => void;
}


export default function AddProjectModal({ isOpen, onClose, onAddProject }: AddProjectModalProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAddProject({ id: Date.now().toString(), name, description })
        setName('')
        setDescription('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                                id="name"
                                className='mt-2'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                className='mt-2'
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit">Add Project</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

