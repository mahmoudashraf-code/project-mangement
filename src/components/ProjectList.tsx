import { Button } from '@/components/ui/button'
import { Project } from '@/types/iProject';
import { useNavigate } from 'react-router-dom';


interface ProjectListProps {
    projects: Project[];
    selectedProject: string
}

export default function ProjectList({ projects, selectedProject }: ProjectListProps) {
    const navigate = useNavigate()
    return (
        <div className="space-y-2">
            {projects.map((project) => (
                <Button
                    key={project.id}
                    variant={selectedProject == project.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(`/app/${project.id}`)}
                >
                    {project.name}
                </Button>
            ))}
        </div>
    )
}

