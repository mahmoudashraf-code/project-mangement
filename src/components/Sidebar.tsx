import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import useProjects from '../hooks/useProjects'
import AddProjectModal from './AddProjectModal'
import ProjectList from './ProjectList'
import { Project } from '@/types/iProject'
import { useParams } from 'react-router-dom'

interface SidebarProps {
    onSelectProject: (project: Project) => void;
}

export default function Sidebar({ onSelectProject }: SidebarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { projects, addProject } = useProjects()
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            let ele = projects.find(ele => ele.id == id)
            if (ele) onSelectProject(ele)
        }
    }, [id]);

    const handleAddProject = (project: Project) => {
        addProject(project)
        setIsModalOpen(false)
    }

    return (
        <div className="w-64 bg-white p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <Button onClick={() => setIsModalOpen(true)} className="mb-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
            <ProjectList projects={projects} selectedProject={id} />
            <AddProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProject={handleAddProject}
            />
        </div>
    )
}

